import { useState } from "react";
import { Paper, Typography, Button, Box, CircularProgress } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = (file) => {
    if (!file) return;

    // ✅ CSV validation
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Only CSV files are allowed");
      return;
    }

    // Optional: show loader briefly for UX
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFileName(file.name);

      // Pass raw file object to parent
      onUploadSuccess({
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        file,
        status: "Ready",
      });
    }, 500);
  };

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <Paper
      elevation={3}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{
        p: 4,
        textAlign: "center",
        border: "2px dashed #ccc",
        cursor: "pointer",
        "&:hover": { borderColor: "#1976d2" },
      }}
    >
      <input
        type="file"
        accept=".csv"
        hidden
        id="file-upload"
        onChange={handleChange}
      />

      <label htmlFor="file-upload">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {loading ? (
            <CircularProgress />
          ) : (
            <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2" }} />
          )}

          <Typography variant="h6">
            Drag & drop CSV file
          </Typography>

          <Button variant="contained" component="span" disabled={loading}>
            Upload File
          </Button>

          {fileName && (
            <Typography color="success.main">
              ✅ {fileName}
            </Typography>
          )}
        </Box>
      </label>
    </Paper>
  );
};

export default FileUpload;