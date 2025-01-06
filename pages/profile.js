import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
                      Confidence: {prediction.prediction.confidence * 100}%
                    </Typography>
                    <img
                      src={`http://localhost:8000${prediction.imageUrl}`}
                      alt="ECG Prediction"
                      style={{ width: "100%", marginTop: 10 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h6">Unable to load user data.</Typography>
      )}
    </Box>
  );
};

export default Profile;
