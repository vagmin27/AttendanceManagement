import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";

import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import AddStudent from "./pages/AddStudent";
import Reports from "./pages/Reports";
import RemoveStudent from "./pages/RemoveStudent";
import AddSubject from "./pages/AddSubject";
import StudentDashboard from "./pages/StudentDashboard";

// Wrap a page in DashboardLayout with a page title
const WithLayout = ({ title, children }) => (
  <DashboardLayout pageTitle={title}>{children}</DashboardLayout>
);

function App() {
  const { isAuthenticated, isTeacher, loading } = useAuth();

  if (loading) {
    return (
      <div className="spinner-page">
        <span className="spinner spinner-lg" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid #334155",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#1e293b" } },
          error:   { iconTheme: { primary: "#ef4444", secondary: "#1e293b" } },
        }}
      />
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to={isTeacher ? "/dashboard" : "/student-dashboard"} />
              : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated
              ? <Navigate to={isTeacher ? "/dashboard" : "/student-dashboard"} />
              : <Register />
          }
        />

        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to={isTeacher ? "/dashboard" : "/student-dashboard"} />
            </ProtectedRoute>
          }
        />

        {/* TEACHER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <WithLayout title="Dashboard"><Dashboard /></WithLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <WithLayout title="Attendance"><Attendance /></WithLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <WithLayout title="Add Student"><AddStudent /></WithLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/remove-student"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <WithLayout title="Remove Student"><RemoveStudent /></WithLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-subject"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <WithLayout title="Add Subject"><AddSubject /></WithLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <WithLayout title="Reports"><Reports /></WithLayout>
            </ProtectedRoute>
          }
        />

        {/* STUDENT ROUTES */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <WithLayout title="My Dashboard"><StudentDashboard /></WithLayout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;