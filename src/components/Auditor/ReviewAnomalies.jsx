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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import { getAllProcurements } from "../../apis/modelapi";

const ReviewAnomalies = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAllProcurements();

        const formatted = data.map((item) => {
          const score = item.prediction_score || 0;

          let severity = "Low";
          if (score >= 0.7) severity = "High";
          else if (score >= 0.4) severity = "Medium";

          return {
            ...item,
            prediction_score: score,
            severity,
            isUploader: item.created_by === 67,

            // NEW FIELDS
            is_flagged: item.is_flagged || false,
            flag_description: item.flag_description || "",
          };
        });

        setAnomalies(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateFlag = (id, field, value) => {
    setAnomalies((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const filteredAnomalies = anomalies.filter((a) => {
    if (filter === "mine") return a.isUploader;
    if (filter === "others") return !a.isUploader;
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
    <Box sx={{ p: 4, background: "#f4f6fb", minHeight: "100vh" }}>
      {/* HEADER */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={800}>
          Procurement Dashboard
        </Typography>
        <Typography color="text.secondary">
          Review anomalies and risk predictions
        </Typography>
      </Box>

      {/* FILTER */}
      <Stack direction="row" spacing={1} mb={3}>
        {["all", "mine", "others"].map((type) => (
          <Button
            key={type}
            onClick={() => setFilter(type)}
            variant={filter === type ? "contained" : "outlined"}
            sx={{ borderRadius: 20, textTransform: "capitalize", px: 3 }}
          >
            {type}
          </Button>
        ))}
      </Stack>

      {/* LOADING */}
      {loading && (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      )}

      {/* CARDS */}
      <Stack spacing={2}>
        {filteredAnomalies.map((a) => (
          <Card
            key={a.id}
            sx={{
              borderRadius: 4,
              borderLeft: `6px solid ${getBorderColor(a.severity)}`,
            }}
          >
            <CardContent>
              {/* HEADER */}
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={700}>
                    Procurement #{a.id}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    {a.country} • {a.tender_year}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Chip label={a.severity} color={getSeverityColor(a.severity)} />
                  <Chip
                    label={`${(a.prediction_score * 100).toFixed(1)}%`}
                    color="primary"
                  />

                  {/* NEW: FLAG STATUS */}
                  <Chip
                    label={a.is_flagged ? "Flagged" : "Not Flagged"}
                    color={a.is_flagged ? "error" : "default"}
                  />
                </Stack>
              </Box>

              {/* RISK BAR */}
              <Box mt={2} mb={2}>
                <LinearProgress
                  variant="determinate"
                  value={a.prediction_score * 100}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* DETAILS */}
              <Typography color="text.secondary">
                <b>Bidder:</b> {a.bidder_id}
              </Typography>

              <Typography color="text.secondary">
                <b>Buyer:</b> {a.buyer_id}
              </Typography>

              <Typography color="text.secondary">
                <b>Bid Price:</b> ${Number(a.bid_price).toLocaleString()}
              </Typography>

              {/* NEW: AUDITOR FLAG SECTION */}
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={a.is_flagged}
                      onChange={(e) =>
                        updateFlag(a.id, "is_flagged", e.target.checked)
                      }
                    />
                  }
                  label="Mark as Anomaly"
                />

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add auditor comment..."
                  value={a.flag_description}
                  onChange={(e) =>
                    updateFlag(a.id, "flag_description", e.target.value)
                  }
                />
              </Box>

              {/* ACTION */}
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  endIcon={<OpenInNewIcon />}
                  onClick={() =>
                    navigate(`/auditor/procurement/${a.id}`)
                  }
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default ReviewAnomalies;