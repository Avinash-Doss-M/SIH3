import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import StudentDashboard from "@pages/dashboard/StudentDashboard";
import MentorDashboard from "@pages/dashboard/MentorDashboard";
import EmployerDashboard from "@pages/dashboard/EmployerDashboard";
import PlacementCellDashboard from "@pages/dashboard/PlacementCellDashboard";
import { useAuth } from "@context/AuthContext";
import ProtectedRoute from "@routes/ProtectedRoute";

const App = () => {
  const { session } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={session ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentor"
        element={
          <ProtectedRoute allowedRoles={["mentor"]}>
            <MentorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer"
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/placement"
        element={
          <ProtectedRoute allowedRoles={["placement_cell", "admin"]}>
            <PlacementCellDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
