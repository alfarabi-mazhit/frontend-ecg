import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Login successful!");
      console.log("Login successful", response.data);
      // Save token or user info to localStorage or state management (if applicable)
      localStorage.setItem("token", response.data.access_token); // Example
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Login failed", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" {...register("email")} fullWidth required />
      <TextField label="Password" type="password" {...register("password")} fullWidth required />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default Login;
