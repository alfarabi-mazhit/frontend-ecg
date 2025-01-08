import { Box, Typography, Button, Grid } from "@mui/material";
import Link from "next/link";

const Home = () => (
  <Box
    sx={{
      backgroundImage: "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      backgroundColor: "linear-gradient(to bottom right, #eceff1, #cfd8dc);", // Fallback if image fails
      backgroundBlendMode: "overlay",
    }}
  >
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 4,
        padding: 4,
        boxShadow: 3,
        textAlign: "center",
        maxWidth: 600,
        width: "100%",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to ECG Predictions
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our platform uses advanced machine learning to analyze ECG data and
        predict heart diseases. Whether you are a healthcare professional or
        just curious, our tools are here to assist you.
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item>
          <Link href="/predictions/upload" passHref>
            <Button variant="contained" color="primary">
              Upload ECG
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/profile" passHref>
            <Button variant="outlined" color="primary">
              View Profile
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default Home;
