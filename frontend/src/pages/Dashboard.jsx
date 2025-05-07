import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  MenuItem,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const itemsList = ["Wheat", "Sugar", "Oil", "Rice"];

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: user?.name || "",
    nic: "",
    items: [],
    walletAddress: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [myClaims, setMyClaims] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleItemsChange = (e) => setForm({ ...form, items: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.walletAddress) {
      setError("Please enter your wallet address!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/claim", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess("Claim submitted successfully!");
      fetchMyClaims(); // Refresh claims after submit
    } catch (err) {
      setError(err.response?.data?.message || "Claim failed");
    }
  };

  const fetchMyClaims = async () => {
    try {
      const res = await axios.get("http://localhost:5000/claim", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMyClaims(res.data.filter(c => c.user.id === user.id));
    } catch (err) {
      setError(err.response?.data?.message || "Claim failed");
    }
  };

  useEffect(() => {
    fetchMyClaims();
    // eslint-disable-next-line
  }, [user.id]);

  // Helper: check if user has claimed this month
  const hasClaimedThisMonth = () => {
    if (!myClaims.length) return false;
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    return myClaims.some(claim => {
      const claimDate = new Date(claim.createdAt);
      return (
        claimDate.getMonth() === thisMonth &&
        claimDate.getFullYear() === thisYear
      );
    });
  };

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h4" mb={2}>
        Welcome, {user?.name}
      </Typography>
      <Typography variant="body1" mb={2}>
        Email: {user?.email}
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Claim Ration
        </Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Show claim form only if not already claimed this month */}
        {!hasClaimedThisMonth() ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Wallet Address"
              name="walletAddress"
              value={form.walletAddress}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="NIC"
              name="nic"
              value={form.nic}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              select
              label="Ration Items"
              name="items"
              value={form.items}
              onChange={handleItemsChange}
              fullWidth
              margin="normal"
              SelectProps={{ multiple: true }}
              required
            >
              {itemsList.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit Claim
            </Button>
          </form>
        ) : (
          <Alert severity="info" sx={{ mb: 2 }}>
            You have already claimed this month.
          </Alert>
        )}
      </Box>
      {myClaims.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Your Claims</Typography>
          {myClaims.map((claim) => (
            <Alert
              key={claim.id}
              severity={
                claim.status === "approved"
                  ? "success"
                  : claim.status === "pending"
                  ? "info"
                  : "error"
              }
            >
              {claim.items.join(", ")} — <b>{claim.status.toUpperCase()}</b>
            </Alert>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;