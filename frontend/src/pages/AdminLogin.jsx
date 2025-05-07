import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:5000/auth/login"; // Same login endpoint

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(API, form);
      if (res.data && res.data.user && res.data.user.role === "admin" && res.data.access_token) {
        login(res.data.user, res.data.access_token);
        navigate("/admin/dashboard");
      } else {
        setError("Not an admin account");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Admin Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login as Admin</Button>
      </form>
    </Box>
  );
};

export default AdminLogin;