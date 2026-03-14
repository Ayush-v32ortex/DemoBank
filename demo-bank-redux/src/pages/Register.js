import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import alertify from "alertifyjs";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "", confirm_password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return alertify.error("Passwords do not match!");
    }
    
    try {
      const response = await axios.post(`http://127.0.0.1:8070/register?confirm_password=${formData.confirm_password}`, formData);
      alertify.success(response.data.message || "Registration successful! Check email.");
      navigate('/login');
    } catch (error) {
      alertify.error("Registration failed.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="First Name" name="first_name" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Last Name" name="last_name" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Email" name="email" type="email" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Password" name="password" type="password" onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Confirm Password" name="confirm_password" type="password" onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
          <Link to="/login">{"Already have an account? Sign In"}</Link>
        </Box>
      </Box>
    </Container>
  );
}