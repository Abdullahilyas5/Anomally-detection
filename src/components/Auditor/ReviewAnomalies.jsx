import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  CircularProgress,
  Button,
  Divider,
  LinearProgress,
  TextField,
  Alert,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FlagIcon from "@mui/icons-material/Flag";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllProcurements } from "../../apis/modelapi";
import { getAllAnomalies, markProcurementAsAnomaly } from "../../apis/anomalies";

const ITEMS_PER_PAGE = 10;
const CACHE_KEY = "auditorReviewProcurementsCache:v2";
const ANOMALIES_CACHE_KEY = "auditorReviewAnomaliesCache:v2";

const ReviewAnomalies = () => {
  const [procurements, setProcurements] = useState([]);
  const [anomalyList, setAnomalyList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});
  const [cache, setCache] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(CACHE_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [anomaliesCache, setAnomaliesCache] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(ANOMALIES_CACHE_KEY)) || null;
    } catch {
      return null;
    }
  });

  const currentUserId = useSelector((state) => state.auth?.user?.id);
  const navigate = useNavigate();

  const persistCache = (nextCache) => {
    setCache(nextCache);
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(nextCache));
    } catch (err) {
      console.warn("Could not persist procurement cache", err);
    }
  };

  const persistAnomaliesCache = (list) => {
    setAnomaliesCache(list);
    try {
      sessionStorage.setItem(ANOMALIES_CACHE_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn("Could not persist anomalies cache", err);
    }
  };

  const loadAnomalies = async () => {
    if (anomaliesCache !== null) {
      setAnomalyList(anomaliesCache);
      return anomaliesCache;
    }

    try {
      const response = await getAllAnomalies();
      const payload = response?.data || response || [];
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.rows)
          ? payload.rows
          : [];
      setAnomalyList(list);
      persistAnomaliesCache(list);
      return list;
    } catch (error) {
      console.error("Failed to load anomalies", error);
      toast.error("Failed to load anomalies");
      return [];
    }
  };

  const formatProcurementItem = (item, anomalyMap) => {
    const score = item.prediction_score || 0;
    let severity = "Low";
    if (score >= 0.7) severity = "High";
    else if (score >= 0.4) severity = "Medium";

    const existingAnomaly = anomalyMap.get(item.id);

    return {
      ...item,
      prediction_score: score,
      severity,
      isUploader: item.created_by === currentUserId,
      is_flagged: Boolean(existingAnomaly),
      flag_description: existingAnomaly?.description || "",
      flag_count: existingAnomaly ? 1 : 0,
      has_anomaly: Boolean(existingAnomaly),
    };
  };

  const loadPage = async (pageToLoad) => {
    if (cache[pageToLoad]) {
      const pageData = cache[pageToLoad];
      setProcurements(pageData.rows);
      setPage(pageData.page);
      setPages(Math.max(1, pageData.pages || Math.ceil(pageData.total / ITEMS_PER_PAGE)));
      setTotal(pageData.total);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const pageData = await getAllProcurements({
        page: pageToLoad,
        limit: ITEMS_PER_PAGE,
      });
      const payload = pageData?.data || pageData;
      const normalized = payload?.rows
        ? payload
        : {
          rows: Array.isArray(payload) ? payload : [],
          total: Array.isArray(payload) ? payload.length : 0,
          page: pageToLoad,
          pages: Array.isArray(payload)
            ? Math.max(1, Math.ceil(payload.length / ITEMS_PER_PAGE))
            : 1,
        };

      const anomaliesForPage = await loadAnomalies();
      const anomalyMap = new Map(
        anomaliesForPage.map((anomaly) => [anomaly.procurement_id, anomaly])
      );
      const items = normalized.rows.map((item) =>
        formatProcurementItem(item, anomalyMap)
      );

      const nextCache = {
        ...cache,
        [pageToLoad]: {
          rows: items,
          total: normalized.total,
          page: normalized.page,
          pages: normalized.pages,
        },
      };

      persistCache(nextCache);
      setProcurements(items);
      setPage(normalized.page);
      setPages(Math.max(1, normalized.pages || Math.ceil(normalized.total / ITEMS_PER_PAGE)));
      setTotal(normalized.total);
    } catch (error) {
      console.error("Failed to load procurements", error);
      toast.error("Failed to load procurements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFlag = (id, field, value) => {
    setProcurements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    if (field === "flag_description" && value.trim()) {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleMarkAsAnomaly = async (item) => {
    if (!item.flag_description?.trim()) {
      setErrors((prev) => ({ ...prev, [item.id]: true }));
      toast.error("Please add a comment before marking as anomaly");
      return;
    }

    try {
      setSavingId(item.id);

      const flagType =
        item.severity === "High"
          ? "error"
          : item.severity === "Medium"
            ? "suspicious"
            : "warning";

      await markProcurementAsAnomaly({
        procurementId: item.id,
        description: item.flag_description,
        severity: item.severity,
        flagType,
      });

      setProcurements((prev) =>
        prev.map((a) =>
          a.id === item.id
            ? { ...a, is_flagged: true, has_anomaly: true }
            : a
        )
      );
      persistCache({});
      sessionStorage.removeItem(CACHE_KEY);

      toast.success(`Procurement #${item.id} marked as anomaly`);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error || "Failed to mark as anomaly"
      );
    } finally {
      setSavingId(null);
    }
  };

  const filteredProcurements = procurements.filter((a) => {
    if (filter === "mine") return a.isUploader;
    if (filter === "others") return !a.isUploader;
    if (filter === "flagged") return a.is_flagged || a.has_anomaly;
    if (filter === "unflagged") return !a.is_flagged && !a.has_anomaly;
    return true;
  });

  const getSeverityColor = (s) => {
    if (s === "High") return "error";
    if (s === "Medium") return "warning";
    return "success";
  };

  const getBorderColor = (s) => {
    if (s === "High") return "#ef4444";
    if (s === "Medium") return "#f59e0b";
    return "#22c55e";
  };

  return (
    <Box sx={{ background: "#f4f6fb", minHeight: "100vh" }}>
      {/*<Box mb={3}>
        <Typography variant="h4" fontWeight={800}>
          Review Anomalies
        </Typography>
        <Typography color="text.secondary">
          Review procurements, flag issues, and mark anomalies for admin review
        </Typography>
      </Box>*/}

      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" gap={1}>
        {["all", "mine", "others", "flagged", "unflagged"].map((type) => (
          <Button
            key={type}
            onClick={() => {
              setFilter(type);
              setPage(1);
            }}
            variant={filter === type ? "contained" : "outlined"}
            sx={{ borderRadius: 20, textTransform: "capitalize", px: 3 }}
          >
            {type}
          </Button>
        ))}
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      )}

      {!loading && filteredProcurements.length === 0 && (
        <Alert severity="info">No procurements found for this filter.</Alert>
      )}

      <Stack spacing={2}>
        {filteredProcurements.map((a) => (
          <Card
            key={a.id}
            sx={{
              borderRadius: 4,
              borderLeft: `6px solid ${getBorderColor(a.severity)}`,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={1}
              >
                <Box>
                  <Typography fontWeight={700}>Procurement #{a.id}</Typography>
                  <Typography fontSize={13} color="text.secondary">
                    {a.country} • {a.tender_year}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label={a.severity} color={getSeverityColor(a.severity)} />
                  <Chip
                    label={`${(a.prediction_score * 100).toFixed(1)}%`}
                    color="primary"
                  />
                  <Chip
                    label={a.has_anomaly ? "Anomaly Recorded" : a.is_flagged ? "Flagged" : "Not Flagged"}
                    color={a.has_anomaly ? "error" : a.is_flagged ? "warning" : "default"}
                  />
                  {a.flag_count > 0 && (
                    <Chip label={`${a.flag_count} flag(s)`} variant="outlined" />
                  )}
                </Stack>

              </Box>

              <Box mt={2} mb={2}>
                <LinearProgress
                  variant="determinate"
                  value={a.prediction_score * 100}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography color="text.secondary">
                <b>Bidder:</b> {a.bidder_id}
              </Typography>
              <Typography color="text.secondary">
                <b>Buyer:</b> {a.buyer_id}
              </Typography>
              <Typography color="text.secondary">
                <b>Bid Price:</b> ${Number(a.bid_price).toLocaleString()}
              </Typography>

              <Box mt={2}>
                <TextField
                  fullWidth
                  required
                  size="small"
                  label="Auditor comment"
                  placeholder="Describe why this procurement is anomalous..."
                  value={a.flag_description || ""}
                  onChange={(e) => updateFlag(a.id, "flag_description", e.target.value)}
                  disabled={a.has_anomaly}
                  error={Boolean(errors[a.id])}
                  helperText={errors[a.id] ? "Auditor comment is required to mark as anomaly" : ""}
                />
              </Box>

              <Box mt={3} display="flex" justifyContent="flex-end" gap={1} flexWrap="wrap">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<FlagIcon />}
                  disabled={a.has_anomaly || savingId === a.id}
                  onClick={() => handleMarkAsAnomaly(a)}
                >
                  {savingId === a.id
                    ? "Saving..."
                    : a.has_anomaly
                      ? "Already Marked"
                      : "Mark as Anomaly"}
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<OpenInNewIcon />}
                  onClick={() => navigate(`/auditor/procurement/${a.id}`)}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {!loading && pages > 1 && (
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
          <Button
            disabled={page === 1}
            onClick={() => {
              const nextPage = Math.max(1, page - 1);
              setPage(nextPage);
              loadPage(nextPage);
            }}
          >
            Previous
          </Button>
          <Typography color="text.secondary">
            Page {page} of {pages} ({total} records)
          </Typography>
          <Button
            disabled={page === pages}
            onClick={() => {
              const nextPage = Math.min(pages, page + 1);
              setPage(nextPage);
              loadPage(nextPage);
            }}
          >
            Next
          </Button>
        </Box>

      )}
    </Box>
  );
};

export default ReviewAnomalies;
