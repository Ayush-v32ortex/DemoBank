import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import api from '../api/axiosConfig';

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get('/logout'); // Tell backend to invalidate session
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(logout()); // Clear Redux and LocalStorage
      navigate('/login');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            DemoBank Pro
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/transactions')}>Transfer</Button>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet /> {/* Child routes will render here */}
      </Container>
    </Box>
  );
}