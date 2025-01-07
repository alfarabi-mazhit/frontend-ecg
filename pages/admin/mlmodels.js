import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ManageMLModels = () => {
  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState({
    version: "",
    accuracy: "",
    status: "active",
    description: "",
    model_url: "",
  });

  const fetchModels = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/mlmodels", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setModels(response.data);
  };

  const handleCreateModel = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8000/mlmodels", newModel, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Model created successfully!");
      fetchModels();
      setNewModel({
        version: "",
        accuracy: "",
        status: "active",
        description: "",
        model_url: "",
      });
    } catch (err) {
      toast.error("Error creating model");
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
        <Typography variant="h6">Add New ML Model</Typography>
        <TextField
          label="Version"
          value={newModel.version}
          onChange={(e) =>
            setNewModel({ ...newModel, version: e.target.value })
          }
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Accuracy"
          value={newModel.accuracy}
          onChange={(e) =>
            setNewModel({ ...newModel, accuracy: e.target.value })
          }
          sx={{ marginRight: 2 }}
        />
        <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={newModel.status}
            onChange={(e) =>
              setNewModel({ ...newModel, status: e.target.value })
            }
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          value={newModel.description}
          onChange={(e) =>
            setNewModel({ ...newModel, description: e.target.value })
          }
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Model URL or Path"
          value={newModel.model_url}
          onChange={(e) =>
            setNewModel({ ...newModel, model_url: e.target.value })
          }
          fullWidth
          sx={{ marginTop: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateModel}
          sx={{ marginTop: 2 }}
        >
          Add Model
        </Button>
      </Box>

      {/* Display Existing Models */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Version</TableCell>
            <TableCell>Accuracy</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Model URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <TableCell>{model.version}</TableCell>
              <TableCell>{model.accuracy}</TableCell>
              <TableCell>{model.status}</TableCell>
              <TableCell>{model.description}</TableCell>
              <TableCell>{model.model_url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ManageMLModels;
