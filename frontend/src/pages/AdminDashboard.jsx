import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchClaims = async () => {
    try {
      const res = await axios.get("http://localhost:5000/claim", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setClaims(res.data);
    } catch (err) {
      setError("Failed to fetch claims");
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/claim/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setSuccess("Claim approved!");
      fetchClaims();
    } catch (err) {
      setError("Failed to approve claim");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/claim/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setSuccess("Claim rejected!");
      fetchClaims();
    } catch (err) {
      setError("Failed to reject claim");
    }
  };

  return (
    <Box maxWidth={900} mx="auto" mt={5}>
      <Typography variant="h4" mb={2}>Admin Dashboard</Typography>
      <Typography variant="body1" mb={2}>Welcome, {user?.name} (Admin)</Typography>
      <Button variant="contained" color="secondary" onClick={() => { logout(); navigate("/admin/login"); }}>
        Logout
      </Button>
      <Box mt={4}>
        <Typography variant="h6" mb={2}>All Claims</Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>NIC</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.name}</TableCell>
                  <TableCell>{claim.nic}</TableCell>
                  <TableCell>{claim.items.join(", ")}</TableCell>
                  <TableCell>{claim.status}</TableCell>
                  <TableCell>
                    {claim.status === "pending" && (
                      <>
                        <Button color="success" onClick={() => handleApprove(claim.id)}>Approve</Button>
                        <Button color="error" onClick={() => handleReject(claim.id)}>Reject</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminDashboard;