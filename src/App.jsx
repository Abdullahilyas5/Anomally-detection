import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth Pages
import Homepage from "./pages/auth/Homepage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Single Dashboard for all roles
import AdminPage from "./pages/admin/AdminPage";
import CitizenPage from "./pages/citizen/CitizenPage"
import EditorPage from "./pages/editor/EditorPage"

// Protected Route Component
import ProtectedRoute from "./components/projectedcomp/ProtectedRoute";

// Admin Pages (uncomment when implemented)
// import AdminDashboard from "./pages/admin/Dashboard";
// import AdminUsers from "./pages/admin/Users";
// import AdminAnomalies from "./pages/admin/Anomalies";
// import AdminConfiguration from "./pages/admin/Configuration";
// import AdminLogs from "./pages/admin/Logs";

// Editor Pages (uncomment when implemented)
// import EditorDashboard from "./pages/editor/Dashboard";
// import EditorProcurements from "./pages/editor/Procurements";
// import EditorReviewAnomalies from "./pages/editor/ReviewAnomalies";
// import EditorComments from "./pages/editor/Comments";
// import EditorAnalytics from "./pages/editor/Analytics";

// Citizen Pages (uncomment when implemented)
// import CitizenDashboard from "./pages/citizen/Dashboard";
// import CitizenReviewedReports from "./pages/citizen/ReviewedReports";
// import CitizenProcurementReviews from "./pages/citizen/ProcurementReviews";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

      {/* Protected Routes for Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminPage role="admin" />
          </ProtectedRoute>
        }
      />
      {/*
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/anomalies" element={<ProtectedRoute><AdminAnomalies /></ProtectedRoute>} />
      <Route path="/admin/configuration" element={<ProtectedRoute><AdminConfiguration /></ProtectedRoute>} />
      <Route path="/admin/logs" element={<ProtectedRoute><AdminLogs /></ProtectedRoute>} />
      */}

      {/* Protected Routes for Editor */}
      <Route
        path="/editor/*"
        element={
          <ProtectedRoute>
            <EditorPage role="editor" />
          </ProtectedRoute>
        }
      />
      {/*
      <Route path="/editor/dashboard" element={<ProtectedRoute><EditorDashboard /></ProtectedRoute>} />
      <Route path="/editor/procurements" element={<ProtectedRoute><EditorProcurements /></ProtectedRoute>} />
      <Route path="/editor/review-anomalies" element={<ProtectedRoute><EditorReviewAnomalies /></ProtectedRoute>} />
      <Route path="/editor/comments" element={<ProtectedRoute><EditorComments /></ProtectedRoute>} />
      <Route path="/editor/analytics" element={<ProtectedRoute><EditorAnalytics /></ProtectedRoute>} />
      */}

      {/* Protected Routes for Citizen */}
      <Route
        path="/citizen/*"
        element={
          <ProtectedRoute>
            <CitizenPage role="citizen" />
          </ProtectedRoute>
        }
      />
      {/*
      <Route path="/citizen/dashboard" element={<ProtectedRoute><CitizenDashboard /></ProtectedRoute>} />
      <Route path="/citizen/reviewed-reports" element={<ProtectedRoute><CitizenReviewedReports /></ProtectedRoute>} />
      <Route path="/citizen/procurement-reviews" element={<ProtectedRoute><CitizenProcurementReviews /></ProtectedRoute>} />
      */}
    </Routes>
  );
};

export default App;