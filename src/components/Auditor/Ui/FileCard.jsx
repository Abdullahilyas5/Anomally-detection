import React, { useState } from "react";
import Button from "../../button";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const FileCard = ({ file, onRemove , handleUpload}) => {
  const [status, setStatus] = useState("Uploaded");
  const [loading, setLoading] = useState(false);

  const detectAnomalies = () => {
    setLoading(true);

    setTimeout(() => {
      setStatus("⚠️ Anomalies Found"); // later dynamic
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="border rounded p-4 flex justify-between items-center">

      {/* Info */}
      <div>
        <h4 className="font-medium">{file.name}</h4>
        <p className="text-sm text-gray-500">{file.size}</p>
        <p className="text-sm mt-1">{status}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 items-center">


        <Button
          text={loading ? "Detecting..." : "Detect Anomalies"}
          cls={`bg-red-500 text-white`}
          func={detectAnomalies}
        />

        <button
          onClick={() => onRemove(file.id)}
          className="text-red-500 text-4xl"
        >
            <IoIosClose />
        </button>
      </div>
    </div>
  );
};

export default FileCard;