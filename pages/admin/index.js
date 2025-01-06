import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

const AdminPanel = () => {
  const router = useRouter();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => router.push("/admin/users")}
          >
            Manage Users
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => router.push("/admin/predictions")}
          >
            Manage Predictions
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPanel;
