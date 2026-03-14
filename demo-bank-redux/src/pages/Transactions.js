import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import api from '../api/axiosConfig';
import alertify from "alertifyjs";

export default function Transactions() {
  const [deposit, setDeposit] = useState({ account_id: "", deposit_amount: "" });
  const [transfer, setTransfer] = useState({ sourceAccount: "", targetAccount: "", amount: "" });

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/transact/deposit", deposit);
      alertify.success(res.data.message);
      setDeposit({ account_id: "", deposit_amount: "" });
    } catch (err) { alertify.error(err.response?.data || "Error"); }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/transact/transfer", transfer);
      alertify.success(res.data.message);
      setTransfer({ sourceAccount: "", targetAccount: "", amount: "" });
    } catch (err) { alertify.error(err.response?.data || "Error"); }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Button component={Link} to="/dashboard" variant="outlined" sx={{ mb: 3 }}>Back to Dashboard</Button>
      <Grid container spacing={4}>
        
        {/* Deposit Block */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>Deposit Funds</Typography>
            <Box component="form" onSubmit={handleDeposit}>
              <TextField fullWidth margin="normal" label="Account ID" value={deposit.account_id} onChange={(e) => setDeposit({...deposit, account_id: e.target.value})} required />
              <TextField fullWidth margin="normal" label="Amount" type="number" value={deposit.deposit_amount} onChange={(e) => setDeposit({...deposit, deposit_amount: e.target.value})} required />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Deposit</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Transfer Block */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>Transfer Funds</Typography>
            <Box component="form" onSubmit={handleTransfer}>
              <TextField fullWidth margin="normal" label="From Account ID" value={transfer.sourceAccount} onChange={(e) => setTransfer({...transfer, sourceAccount: e.target.value})} required />
              <TextField fullWidth margin="normal" label="To Account ID" value={transfer.targetAccount} onChange={(e) => setTransfer({...transfer, targetAccount: e.target.value})} required />
              <TextField fullWidth margin="normal" label="Amount" type="number" value={transfer.amount} onChange={(e) => setTransfer({...transfer, amount: e.target.value})} required />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Transfer</Button>
            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}