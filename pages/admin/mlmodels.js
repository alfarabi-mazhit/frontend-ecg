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
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ManageMLModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newModel, setNewModel] = useState({
    version: "",
    accuracy: "",
    description: "",
  });

  const fetchModels = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/mlmodels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
      toast.error("Failed to fetch models.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddModel = async () => {
    const { version, accuracy, description } = newModel;
    if (!version || !accuracy) {
      toast.error("Version and accuracy are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/mlmodels",
        {
          version,
          accuracy: parseFloat(accuracy),
          description,
          status: "active",
          parameters: { learning_rate: 0.001, epochs: 20, batch_size: 32 },
          performance_metrics: { precision: 0.9, recall: 0.85, f1_score: 0.87 },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Model added successfully!");
      setNewModel({ version: "", accuracy: "", description: "" });
      fetchModels();
    } catch (error) {
      console.error("Error adding model:", error);
      toast.error("Failed to add model.");
    }
  };

  const handleDeleteModel = async (modelId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/mlmodels/${modelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Model deleted successfully!");
      fetchModels();
    } catch (error) {
      console.error("Error deleting model:", error);
      toast.error("Failed to delete model.");
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage ML Models
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Add New Model</Typography>
        <TextField
          label="Version"
          value={newModel.version}
          onChange={(e) => setNewModel({ ...newModel, version: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Accuracy"
          type="number"
          value={newModel.accuracy}
          onChange={(e) => setNewModel({ ...newModel, accuracy: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={newModel.description}
          onChange={(e) =>
            setNewModel({ ...newModel, description: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddModel}
          sx={{ marginTop: 2 }}
        >
          Add Model
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Version</TableCell>
              <TableCell>Accuracy</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell>{model.version}</TableCell>
                <TableCell>{model.accuracy}</TableCell>
                <TableCell>{model.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteModel(model.id)}
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

export default ManageMLModels;
