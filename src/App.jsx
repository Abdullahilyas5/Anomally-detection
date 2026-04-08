import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth Pages
import Homepage from "./pages/auth/Homepage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Single Dashboard for all roles
import AdminPage from "./pages/admin/AdminPage";
import CitizenPage from "./pages/citizen/CitizenPage"
import AuditorPage from "./pages/Auditor/AuditorPage";

// Protected Route Component
import ProtectedRoute from "./components/projectedcomp/ProtectedRoute";
import AnalyticsDashboard from "./components/Admin/AnalyticsDashboard";
import Dashboard from "./components/Dashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminAnomalies from "./components/Admin/Anomalies";
import Reports from "./components/admin/Reports";
import Configuration from "./components/Admin/Configuration";
import AdminLogs from "./components/Admin/AdminLogs";
// import LogoutModal from "./components/modals/LogoutModal";
import LogoutModal from "./components/Admin/Logout";

import CSVViewer from "./components/Auditor/Ui/CSVViewer";

// Admin Pages (uncomment when implemented)
// import AdminDashboard from "./pages/admin/Dashboard";
// import AdminUsers from "./pages/admin/Users";
// import AdminConfiguration from "./pages/admin/Configuration";


//? Auditor Pages (uncomment when implemented)
import AuditorDashboard from "./components/Auditor/AuditorDashboard";
import AuditorProcurements from "./components/Auditor/AuditorProcurements";
import ReviewAnomalies from "./components/Auditor/ReviewAnomalies";
// import AnomaliesReports from "./components/Auditor/AnomaliesReports";
import LandingPage from "./pages/LandingPage";

//? Citizen Pages (uncomment when implemented)

import CitizenDashboard from "./components/Citizen/CitizenDashboard";
import CitizenReviewedReports from "./components/Citizen/CitizenReviewedReports";
import CitizenProcurementReviews from "./components/Citizen/CitizenProcurementReviews";
import Signup from "./components/sections/Signup";
import ConfirmationRoleTable from "./components/Admin/ConfirmationRoleTable";
import SettingsPage from "./components/Admin/SettingsPage";
import Notificaiton from "./components/Admin/Notificaiton";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}

      <Route path="/" element={<LandingPage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/logout" element={
        <Dashboard role={"citizen"}>
          <LogoutModal />
        </Dashboard>
      } />


    

      {/* Protected Routes for Admin */}
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

      <Route path="/admin/users" element={<ProtectedRoute>
        <AdminPage role="admin">
          <AdminUsers />
        </AdminPage>
      </ProtectedRoute>} />


      <Route path="/admin/anomalies" element={<ProtectedRoute>
        <AdminPage role="admin">
          <AdminAnomalies />
        </AdminPage>
      </ProtectedRoute>} />


      <Route path="/admin/report" element={<ProtectedRoute>
        <AdminPage role="admin">
          <Reports />
        </AdminPage>
      </ProtectedRoute>} />

      <Route path="/admin/configuration" element={<ProtectedRoute><AdminPage role="admin">
        <Configuration />
      </AdminPage>
      </ProtectedRoute>} />

      <Route path="/admin/logs" element={<ProtectedRoute>
        <AdminPage role="admin">
          <AdminLogs />
        </AdminPage>
      </ProtectedRoute>} />


      <Route path="/admin/settings" element={<ProtectedRoute>
        <AdminPage role="admin">
          <SettingsPage/>
        </AdminPage>
      </ProtectedRoute>} />



      //? Protected Routes for Auditor

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
          <AuditorProcurements />
        </AuditorPage>
      </ProtectedRoute>} />

      <Route path="/auditor/review-anomalies" element={<ProtectedRoute>
        <AuditorPage role="auditor">
          <ReviewAnomalies />
        </AuditorPage>
      </ProtectedRoute>} />

      {/* <Route path="/auditor/anomalies-reports" element={<ProtectedRoute>
        <AuditorPage role="auditor">
          <AnomaliesReports />
        </AuditorPage>
      </ProtectedRoute>} /> */}

      <Route path="/auditor/settings" element={<ProtectedRoute>
        <AdminPage role="auditor">
          <SettingsPage/>
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

      {/* <Route
        path="/citizen/procurements"
        element={
          <ProtectedRoute>
            <CitizenPage role="citizen">
              <CitizenDashboard />
            </CitizenPage>
          </ProtectedRoute>
        }
      /> */}

      <Route path="/citizen/reviewed-reports" element={<ProtectedRoute>
        <CitizenPage role="citizen">
          <CitizenReviewedReports />
        </CitizenPage>
      </ProtectedRoute>} />

      <Route path="/citizen/procurement-reviews" element={<ProtectedRoute>
        <CitizenPage role="citizen">
          <CitizenProcurementReviews />
        </CitizenPage>
      </ProtectedRoute>} />


      <Route path="/citizen/settings" element={<ProtectedRoute>
        <AdminPage role="citizen">
          <SettingsPage/>
        </AdminPage>
      </ProtectedRoute>} />


      //? Notification

      <Route path="/citizen/notify" element={<ProtectedRoute>
        <AdminPage role="citizen">
          <Notificaiton/>
        </AdminPage>
      </ProtectedRoute>} />



    </Routes >
  );
};

export default App;