import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [note, setNote] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch user details
      const userResponse = await axios.get("http://localhost:8000/users/me", {
        headers,
      });
      setUser(userResponse.data);

      // Fetch user's predictions
      const predictionsResponse = await axios.get(
        `http://localhost:8000/predictions/${userResponse.data.id}`,
        { headers }
      );
      setPredictions(predictionsResponse.data);

      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch profile data.");
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  const handleNoteUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.patch(
        `http://localhost:8000/predictions/${selectedPrediction.id}`,
        { notes: note },
        { headers }
      );

      toast.success("Note updated successfully!");
      setModalOpen(false);

      // Update the predictions list
      setPredictions((prevPredictions) =>
        prevPredictions.map((pred) =>
          pred.id === selectedPrediction.id ? { ...pred, notes: note } : pred
        )
      );
    } catch (error) {
      toast.error("Failed to update note.");
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {user ? (
        <>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Role: {user.role}
          </Typography>

          <Typography variant="h5" gutterBottom>
            Your Predictions
          </Typography>
          <Grid container spacing={3}>
            {predictions.map((prediction) => (
              <Grid item xs={12} sm={6} md={4} key={prediction.id}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1">
                      Result: {prediction.prediction.result}
                    </Typography>
                    <Typography variant="subtitle2">
                      Confidence: {(prediction.prediction.confidence * 100).toFixed(2)}%
                    </Typography>
                    <img
                      src={`http://localhost:8000/predictions/image/${prediction.imageUrl}`}
                      alt="ECG Prediction"
                      style={{ width: "100%", marginTop: 10 }}
                    />
                    {prediction.notes && (
                      <Typography variant="body2" sx={{ marginTop: 2 }}>
                        <strong>Notes:</strong> {prediction.notes}
                      </Typography>
                    )}
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ marginTop: 2 }}
                      onClick={() => {
                        setSelectedPrediction(prediction);
                        setNote(prediction.notes || "");
                        setModalOpen(true);
                      }}
                    >
                      Edit Notes
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Modal for Adding/Editing Notes */}
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Edit Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Box sx={{ marginTop: 2, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNoteUpdate}
                  sx={{ marginRight: 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      ) : (
        <Typography variant="h6">Unable to load user data.</Typography>
      )}
    </Box>
  );
};

export default Profile;
