import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "../context/AuthContext.jsx";
const API = "http://localhost:5000/auth/login"; // Backend endpoint

const Login = () => {
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
if (res.data && res.data.user && res.data.access_token) {
  login(res.data.user, res.data.access_token);
  if (res.data.user.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/dashboard");
  }
} else {
  setError("Login failed");
}
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
      <Button onClick={() => navigate("/register")} sx={{ mt: 2 }}>Don't have an account? Register</Button>
    </Box>
  );
};

export default Login;