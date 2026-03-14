import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { Avatar, Button, TextField, Box, Typography, Container, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8070/login', credentials);
      // Update Global Redux Store
      dispatch(loginSuccess(response.data)); 
      alertify.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      alertify.error(error.response?.data || 'Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5" mb={2}>Secure Login</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email Address" name="email" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} required />
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
          <Box textAlign="center">
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>Don't have an account? Sign Up</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}