import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAccessToken, login } from "./redux/features/auth/authSlice";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import Signup from "./components/sections/Signup";
import VerifyEmail from "./components/sections/VerifyEmail";
import LandingPage from "./pages/LandingPage";

// Dashboards
import AdminPage from "./pages/admin/AdminPage";
import AuditorPage from "./pages/Auditor/AuditorPage";
import CitizenPage from "./pages/citizen/CitizenPage";

// Protected Route
import ProtectedRoute from "./components/projectedcomp/ProtectedRoute";

// Admin Components
import AnalyticsDashboard from "./components/Admin/AnalyticsDashboard";
import Dashboard from "./components/Dashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminAnomalies from "./components/Admin/Anomalies";
import Configuration from "./components/Admin/Configuration";
import AdminLogs from "./components/Admin/AdminLogs";
import AddProcurement from "./components/Admin/AddProcurement";
import Docs from "./components/Admin/Docs";
import Reports from "./components/Admin/Reports";
import ConfirmationRoleTable from "./components/Admin/ConfirmationRoleTable";
import SettingsPage from "./components/Admin/SettingsPage";
import Notificaiton from "./components/Admin/Notificaiton";
import LogoutModal from "./components/Admin/Logout";

// Auditor Components
import AuditorDashboard from "./components/Auditor/AuditorDashboard";
import ReviewAnomalies from "./components/Auditor/ReviewAnomalies";
import AuditorManualUpload from "./components/Auditor/AuditorManualUpload";
import AuditorCsvUpload from "./components/Auditor/AuditorCsvUpload";
import AuditorPdfUpload from "./components/Auditor/AuditorPdfUpload";
import SingleProcurement from "./components/Auditor/SingleProcurement";

// Citizen Components
import CitizenDashboard from "./components/Citizen/CitizenDashboard";
import CitizenReviewedReports from "./components/Citizen/CitizenReviewedReports";
import CitizenProcurementReviews from "./components/Citizen/CitizenProcurementReviews";

// =========================
// ROLE ROUTE MAP
// =========================
const roleHome = {
  admin: "/admin/dashboard",
  auditor: "/auditor/dashboard",
  citizen: "/citizen/dashboard",
};

// =========================
// AUTH REHYDRATION + ROLE FIX
// =========================
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { role, accessToken } = useSelector((state) => state.auth);

  // -------------------------
  // RESTORE AUTH ON REFRESH
  // -------------------------
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token) {
      dispatch(setAccessToken(token));
    }

    if (user) {
      try {
        const parsedUser = JSON.parse(user);

        dispatch(
          login({
            user: parsedUser,
            accessToken: token,
          })
        );
      } catch (err) {
        console.error("Invalid user in storage");
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  // -------------------------
  // FIX WRONG DASHBOARD ISSUE
  // -------------------------
  useEffect(() => {
    const token = accessToken || localStorage.getItem("accessToken");

    if (!token) return;

    const home = roleHome[role];

    const isAuthPage =
      location.pathname === "/" ||
      location.pathname === "/login";

    if (isAuthPage && home) {
      navigate(home, { replace: true });
    }
  }, [role, accessToken, location.pathname, navigate]);

  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify/email" element={<VerifyEmail />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <AnalyticsDashboard />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard/requests"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <ConfirmationRoleTable />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <AdminUsers />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/anomalies"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <AdminAnomalies />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/report"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <Reports />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/configuration"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <Configuration />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <AdminLogs />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/docs"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <Docs />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <SettingsPage />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-procurement"
        element={
          <ProtectedRoute>
            <AdminPage role="admin">
              <AddProcurement />
            </AdminPage>
          </ProtectedRoute>
        }
      />

      {/* ================= AUDITOR ================= */}
      <Route
        path="/auditor/dashboard"
        element={
          <ProtectedRoute>
            <AuditorPage role="auditor">
              <AuditorDashboard />
            </AuditorPage>
          </ProtectedRoute>
        }
      />



      <Route path="/auditor/procurements" element={<ProtectedRoute>
        <AuditorPage role="auditor">
          <AuditorCsvUpload />
        </AuditorPage>
      </ProtectedRoute>} />

      <Route path="/auditor/review-anomalies" element={
        <ProtectedRoute>
          <AuditorPage role="auditor">
            <ReviewAnomalies />
          </AuditorPage>
        </ProtectedRoute>
      } />

      <Route path="/auditor/procurement/:id" element={
        <ProtectedRoute>
          <AuditorPage role="auditor">
            <SingleProcurement />
          </AuditorPage>
        </ProtectedRoute>
      } />

      <Route path="/auditor/manual-upload" element={
        <ProtectedRoute>
          <AuditorPage role="auditor">
            <AuditorManualUpload />
          </AuditorPage>
        </ProtectedRoute>
      } />

      <Route path="/auditor/csv-upload" element={
        <ProtectedRoute>
          <AuditorPage role="auditor">
            <AuditorCsvUpload />
          </AuditorPage>
        </ProtectedRoute>
      } />

      <Route path="/auditor/pdf-upload" element={
        <ProtectedRoute>
          <AuditorPage role="auditor">
            <AuditorPdfUpload />
          </AuditorPage>
        </ProtectedRoute>
      } />

      <Route path="/auditor/reports" element={<ProtectedRoute>
        <AuditorPage role="auditor">
          <Reports />
        </AuditorPage>
      </ProtectedRoute>} />

      <Route path="/auditor/review-reports" element={<ProtectedRoute>
        <AuditorPage role="auditor">
          <CitizenReviewedReports />
        </AuditorPage>
      </ProtectedRoute>} />

      <Route path="/auditor/settings" element={<ProtectedRoute>
        <AdminPage role="auditor">
          <SettingsPage />
        </AdminPage>
      </ProtectedRoute>} />


      //?Protected Routes for Citizen

      <Route
        path="/citizen/dashboard"
        element={
          <ProtectedRoute>
            <CitizenPage role="citizen">
              <CitizenDashboard />
            </CitizenPage>
          </ProtectedRoute>
        }
      />

      <Route path="/citizen/reviewed-reports" element={
        <ProtectedRoute>
          <CitizenPage role="citizen">
            <CitizenReviewedReports />
          </CitizenPage>
        </ProtectedRoute>
      } />

      <Route path="/citizen/procurement-reviews" element={
        <ProtectedRoute>
          <CitizenPage role="citizen">
            <CitizenProcurementReviews />
          </CitizenPage>
        </ProtectedRoute>
      } />

      <Route path="/citizen/settings" element={
        <ProtectedRoute>
          <CitizenPage role="citizen">
            <SettingsPage />
          </CitizenPage>
        </ProtectedRoute>
      } />

      <Route path="/citizen/notify" element={
        <ProtectedRoute>
          <CitizenPage role="citizen">
            <Notificaiton />
          </CitizenPage>
        </ProtectedRoute>
      } />

    </Routes>
  );
};

export default App;