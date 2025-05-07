import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:5000/user/register"; // Backend endpoint

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
      </form>
      <Button onClick={() => navigate("/login")} sx={{ mt: 2 }}>Already have an account? Login</Button>
    </Box>
  );
};

export default Register;