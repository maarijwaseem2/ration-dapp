import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// PrivateRoute for normal users
function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user && user.role === "user" ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user && user.role === "admin" ? children : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* User dashboard (only for user role) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Admin dashboard (only for admin role) */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;