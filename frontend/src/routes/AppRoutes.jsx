import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import FocusPage from "../pages/FocusPage";
import CollaborationPage from "../pages/CollaborationPage";
import TaskPage from "../pages/TaskPage";
import ProfilePage from "../pages/ProfilePage";
import WorkspacePage from "../pages/WorkspacePage";

function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
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
        path="/task"
        element={
          <ProtectedRoute>
            <TaskPage />
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

      <Route
        path="/workspace/:taskId"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;