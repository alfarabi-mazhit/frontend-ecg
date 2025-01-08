import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const UploadPrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [note, setNote] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setPredictionResult(null); // Reset prediction result on new file upload
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/predictions/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPredictionResult(response.data);
      toast.success("Prediction successful!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!note.trim()) {
      toast.error("Note cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/predictions/${predictionResult.predictionId}`,
        { notes: note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Upload ECG for Prediction
      </Typography>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ margin: "20px 0" }}
      />
      {imagePreview && (
        <Box sx={{ margin: "20px 0" }}>
          <img
            src={imagePreview}
            alt="Selected"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
      )}
      <br />

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Upload and Predict"}
      </Button>

      {predictionResult && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Prediction Result</Typography>
          <Typography>Result: {predictionResult.result}</Typography>
          <Typography>
            Confidence: {(predictionResult.confidence * 100).toFixed(2)}%
          </Typography>
          <TextField
            label="Add Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            multiline
            sx={{ marginTop: 2 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddNote}
            sx={{ marginTop: 2 }}
          >
            Add Note
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UploadPrediction;
