// ========================================
// FILE: src/routes/AppRoutes.jsx
// ========================================

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import FocusPage from "../pages/FocusPage";
import CollaborationPage from "../pages/CollaborationPage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/focus"
        element={
          <ProtectedRoute>
            <FocusPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/collaboration"
        element={
          <ProtectedRoute>
            <CollaborationPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;