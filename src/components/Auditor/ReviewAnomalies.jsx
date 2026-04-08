import React, { useState, useEffect } from "react";
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
  ToggleButtonGroup
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ReviewAnomalies = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [activeCommentIds, setActiveCommentIds] = useState([]);
  const [savingIds, setSavingIds] = useState([]);
  const [filter, setFilter] = useState("all"); // all / mine / others

  // Dummy data
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        file_name: "procurement_2026_03.csv",
        short_description: "Unusual spike in procurement amount on 2026-03-15",
        severity: "High",
        auditorComment: "",
        otherAuditorComments: ["Check invoice total", "Verify vendor account"],
        isUploader: true,
        fileUrl: "/files/procurement_2026_03.csv",
        detected: true,
        flagged: null
      },
      {
        id: 2,
        file_name: "procurement_2026_02.csv",
        short_description: "Multiple small invoices just below threshold",
        severity: "Medium",
        auditorComment: "",
        otherAuditorComments: ["Possible split transactions"],
        isUploader: false,
        fileUrl: "/files/procurement_2026_02.csv",
        detected: true,
        flagged: null
      },
      {
        id: 3,
        file_name: "procurement_2026_01.csv",
        short_description: "Supplier repeated without competitive bidding",
        severity: "Low",
        auditorComment: "",
        otherAuditorComments: [],
        isUploader: false,
        fileUrl: "/files/procurement_2026_01.csv",
        detected: false,
        flagged: null
      }
    ];

    setTimeout(() => setAnomalies(dummyData), 500);
  }, []);

  const toggleCommentBox = (id) => {
    setActiveCommentIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCommentChange = (id, comment) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, auditorComment: comment } : a))
    );
  };

  const saveComment = (id) => {
    const anomaly = anomalies.find(a => a.id === id);
    if (!anomaly) return;

    setSavingIds(prev => [...prev, id]);

    setTimeout(() => {
      alert(`Comment saved for ${anomaly.file_name}`);
      setSavingIds(prev => prev.filter(i => i !== id));
      setActiveCommentIds(prev => prev.filter(i => i !== id));
    }, 800);
  };

  const openFile = (url) => window.open(url, "_blank");

  const flagAnomaly = (id, flagType) => {
    setAnomalies(prev =>
      prev.map(a => (a.id === id ? { ...a, flagged: flagType } : a))
    );
  };

  const filteredAnomalies = anomalies.filter(a => {
    if (filter === "mine") return a.isUploader;
    if (filter === "others") return !a.isUploader;
    return true;
  });

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Review Anomalies
      </Typography>

      {/* Filter Buttons */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, val) => val && setFilter(val)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="mine">Mine</ToggleButton>
        <ToggleButton value="others">Others</ToggleButton>
      </ToggleButtonGroup>

      <Stack spacing={3}>
        {filteredAnomalies.length === 0 && (
          <Typography>No anomalies to show</Typography>
        )}
        {filteredAnomalies.map(a => {
          const isCommentActive = activeCommentIds.includes(a.id);
          const isSaving = savingIds.includes(a.id);

          // Minimal background for uploader / neutral
          const cardBg = a.isUploader ? "rgba(25,118,210,0.05)" : "background.paper";

          return (
            <Card
              key={a.id}
              sx={{ borderLeft: a.isUploader ? "6px solid #1976d2" : "none", bgcolor: cardBg, boxShadow: 2 }}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1"><strong>File:</strong> {a.file_name}</Typography>
                    <Stack direction="row" spacing={1}>
                      {/* Severity badge */}
                      <Chip
                        label={a.severity}
                        color={
                          a.severity === "High" ? "error" :
                          a.severity === "Medium" ? "warning" :
                          "success"
                        }
                        size="small"
                      />
                      {/* Detection badge */}
                      <Chip
                        label={a.detected ? "Detected" : "Not Detected"}
                        color={a.detected ? "error" : "success"}
                        size="small"
                      />
                      {/* Flag badge */}
                      {a.flagged && (
                        <Chip
                          label={a.flagged === "falsePositive" ? "False Positive" : "False Negative"}
                          color={a.flagged === "falsePositive" ? "warning" : "secondary"}
                          size="small"
                        />
                      )}
                    </Stack>
                  </Box>

                  <Typography variant="body1">{a.short_description}</Typography>
                  <Divider sx={{ my: 1 }} />

                  {/* Action buttons */}
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button
                      size="small"
                      variant={isCommentActive ? "contained" : "outlined"}
                      onClick={() => toggleCommentBox(a.id)}
                    >
                      {isCommentActive ? "Cancel" : "Add Comment"}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => openFile(a.fileUrl)}
                      endIcon={<OpenInNewIcon />}
                    >
                      Open File
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => flagAnomaly(a.id, "falsePositive")}
                    >
                      False Positive
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => flagAnomaly(a.id, "falseNegative")}
                    >
                      False Negative
                    </Button>
                  </Stack>

                  {/* Collapsible comment box */}
                  <Collapse in={isCommentActive}>
                    <Box mt={2}>
                      <TextField
                        label="Your Comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={2}
                        value={a.auditorComment}
                        onChange={e => handleCommentChange(a.id, e.target.value)}
                        disabled={isSaving}
                      />
                      <Box mt={1} display="flex" justifyContent="flex-end">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => saveComment(a.id)}
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Comment"}
                        </Button>
                      </Box>
                    </Box>
                  </Collapse>

                  {/* Other auditors' comments */}
                  {a.otherAuditorComments.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Other Auditors' Comments:
                      </Typography>
                      <Stack spacing={0.5} mt={0.5}>
                        {a.otherAuditorComments.map((c, i) => (
                          <Card key={i} variant="outlined" sx={{ p: 1, bgcolor: "grey.100", fontSize: "0.9rem" }}>
                            {c}
                          </Card>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ReviewAnomalies;