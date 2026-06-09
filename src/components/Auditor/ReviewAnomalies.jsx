import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getAllProcurements } from "../../apis/modelapi";

const ReviewAnomalies = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [activeCommentIds, setActiveCommentIds] = useState([]);
  const [savingIds, setSavingIds] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllProcurements();

        const formatted = data.map((item) => {
          const score = item.prediction_score;

          let severity = "Low";
          if (score >= 0.7) severity = "High";
          else if (score >= 0.4) severity = "Medium";

          return {
            id: item.id,
            file_name: `Procurement #${item.id}`,
            short_description: `Country: ${item.country} | Bidder: ${item.bidder_id} | Buyer: ${item.buyer_id} | Amount: ${item.bid_price}`,

            severity,
            prediction_score: score,

            auditorComment: "",
            otherAuditorComments: [],

            isUploader: item.created_by === 67,
            fileUrl: "#",

            detected: score !== null,
            flagged: item.is_flagged,
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

  const toggleCommentBox = (id) => {
    setActiveCommentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCommentChange = (id, comment) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, auditorComment: comment } : a))
    );
  };

  const saveComment = (id) => {
    setSavingIds((prev) => [...prev, id]);

    setTimeout(() => {
      setSavingIds((prev) => prev.filter((i) => i !== id));
      setActiveCommentIds((prev) => prev.filter((i) => i !== id));
    }, 800);
  };

  const openFile = (url) => window.open(url, "_blank");

  const flagAnomaly = (id, flagType) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, flagged: flagType } : a))
    );
  };

  const filteredAnomalies = anomalies.filter((a) => {
    if (filter === "mine") return a.isUploader;
    if (filter === "others") return !a.isUploader;
    return true;
  });

  return (
    <Box sx={{ p: 4, background: "#f6f7fb", minHeight: "100vh" }}>

      {/* HEADER */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        Procurement Review Dashboard
      </Typography>

      {/* FILTER */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, val) => val && setFilter(val)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="mine">My Records</ToggleButton>
        <ToggleButton value="others">Others</ToggleButton>
      </ToggleButtonGroup>

      {/* LOADING */}
      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {/* EMPTY */}
      {!loading && filteredAnomalies.length === 0 && (
        <Typography>No records found</Typography>
      )}

      {/* CARDS */}
      <Stack spacing={2}>
        {filteredAnomalies.map((a) => {
          const isOpen = activeCommentIds.includes(a.id);
          const isSaving = savingIds.includes(a.id);

          return (
            <Card
              key={a.id}
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                borderLeft: "6px solid",
                borderColor:
                  a.severity === "High"
                    ? "error.main"
                    : a.severity === "Medium"
                    ? "warning.main"
                    : "success.main",
              }}
            >
              <CardContent>

                {/* TOP */}
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography fontWeight={600}>
                    {a.file_name}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Chip label={a.severity} size="small"
                      color={
                        a.severity === "High"
                          ? "error"
                          : a.severity === "Medium"
                          ? "warning"
                          : "success"
                      }
                    />

                    <Chip
                      label={a.detected ? "Anomaly" : "Normal"}
                      size="small"
                      color={a.detected ? "error" : "success"}
                    />

                    {a.flagged && (
                      <Chip label={a.flagged} size="small" color="secondary" />
                    )}
                  </Stack>
                </Box>

                {/* DESCRIPTION */}
                <Typography color="text.secondary" mb={2}>
                  {a.short_description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* ACTIONS */}
                <Stack direction="row" spacing={1} flexWrap="wrap">

                  <Button size="small" onClick={() => toggleCommentBox(a.id)}>
                    Comment
                  </Button>

                  <Button size="small" onClick={() => openFile(a.fileUrl)} endIcon={<OpenInNewIcon />}>
                    Open
                  </Button>

                  <Button size="small" color="warning" onClick={() => flagAnomaly(a.id, "False Positive")}>
                    FP
                  </Button>

                  <Button size="small" color="secondary" onClick={() => flagAnomaly(a.id, "False Negative")}>
                    FN
                  </Button>

                </Stack>

                {/* COMMENT */}
                <Collapse in={isOpen}>
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      value={a.auditorComment}
                      onChange={(e) => handleCommentChange(a.id, e.target.value)}
                    />

                    <Box mt={1} display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        disabled={isSaving}
                        onClick={() => saveComment(a.id)}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                    </Box>
                  </Box>
                </Collapse>

              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ReviewAnomalies;