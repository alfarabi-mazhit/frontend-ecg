import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";

const PredictionsChart = ({ predictions }) => {
  const dates = predictions.map((pred) =>
    new Date(pred.createdAt).toLocaleDateString()
  );

  const counts = dates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Predictions Over Time",
        data: Object.values(counts),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6">Predictions Over Time</Typography>
      <Line data={chartData} />
    </Box>
  );
};

const ManagePredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/predictions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPredictions(response.data);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      toast.error("Failed to fetch predictions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrediction = async (predictionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/predictions/${predictionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Prediction deleted successfully!");
      fetchPredictions(); // Refresh the predictions list
    } catch (error) {
      console.error("Error deleting prediction:", error);
      toast.error("Failed to delete prediction.");
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Predictions
      </Typography>

      {/* Chart for Predictions Over Time */}
      <PredictionsChart predictions={predictions} />

      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.map((prediction) => (
              <TableRow key={prediction.id}>
                <TableCell>
                  <img
                    src={`http://localhost:8000${prediction.imageUrl}`}
                    alt="ECG"
                    style={{ width: "100px" }}
                  />
                </TableCell>
                <TableCell>{prediction.prediction.result}</TableCell>
                <TableCell>
                  {(prediction.prediction.confidence * 100).toFixed(2)}%
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeletePrediction(prediction.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default ManagePredictions;
