import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';
import api from '../api/axiosConfig';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/app/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Dashboard fetch failed");
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <Typography align="center" mt={5}>Loading secure data...</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Account Overview</Typography>
      
      <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 50, mr: 2, opacity: 0.8 }} />
          <Box>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>Total Available Balance</Typography>
            <Typography variant="h3">${data.totalBalance || '0.00'}</Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>Your Accounts</Typography>
      <Grid container spacing={3}>
        {data.userAccounts?.map((acc) => (
          <Grid item xs={12} sm={6} md={4} key={acc.account_id}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">{acc.account_name}</Typography>
                <Typography color="text.secondary" variant="body2">Acc #: {acc.account_number}</Typography>
                <Typography color="text.secondary" variant="body2" mb={2}>Type: {acc.account_type}</Typography>
                <Typography variant="h4">${acc.balance}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}