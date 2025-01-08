import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const Signup = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Signup successful!");
      console.log("Signup successful", response.data);
      router.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.detail || "Signup failed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Signup failed", error);
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
      <Typography variant="h4">Signup</Typography>
      <TextField label="Email" {...register("email")} fullWidth required />
      <TextField label="Password" type="password" {...register("password")} fullWidth required />
      <Button type="submit" variant="contained" color="primary">
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
