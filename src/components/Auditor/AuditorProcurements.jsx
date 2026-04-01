import React, { useState } from "react";
import FileCard from "./Ui/FileCard";

const AuditorProcurements = () => {
  const [files, setFiles] = useState([]);
  const [deletedFile, setDeletedFile] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validation
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Only CSV files are allowed!");
      return;
    }

    const newFile = {
      id: Date.now(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      file,
      status: "Uploaded",
    };

    setFiles((prev) => [...prev, newFile]);
  };

  const removeFile = (id) => {
    const fileToDelete = files.find((f) => f.id === id);
    setDeletedFile(fileToDelete);
    setFiles(files.filter((f) => f.id !== id));
  };

  const undoDelete = () => {
    if (deletedFile) {
      setFiles((prev) => [...prev, deletedFile]);
      setDeletedFile(null);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-xl font-semibold">Procurement Files</h2>

      {/* Upload */}
      <div className="border p-4 rounded">
        <input type="file" accept=".csv" onChange={handleUpload} />
      </div>

      {/* File Cards */}
      <div className="grid gap-4">
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onRemove={removeFile}
          />
        ))}
      </div>

      {/* Undo */}
      {deletedFile && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">
          File removed
          <button onClick={undoDelete} className="ml-2 underline">
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default AuditorProcurements;