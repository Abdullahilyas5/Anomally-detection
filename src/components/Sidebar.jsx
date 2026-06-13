import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import {
  MdLogout,
  MdOutlineRateReview,
  MdOutlineRequestPage,
  MdOutlineAdd,
  MdOutlineHelp,
  MdAnalytics,
} from "react-icons/md";
import { RiAdminLine, RiListSettingsLine } from "react-icons/ri";
import { TbUserEdit, TbReportSearch } from "react-icons/tb";
import { FaRegUser, FaFileContract } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";

import { logout as logoutApi } from "../apis/auth";

const sidebarConfig = {
  admin: [
    { label: "Dashboard", icon: <IoHomeOutline />, path: "/admin/dashboard" },
    { label: "Users", icon: <FaRegUser />, path: "/admin/users" },
    { label: "Anomalies", icon: <CgDanger />, path: "/admin/anomalies" },
    { label: "Reports", icon: <TbReportSearch />, path: "/admin/report" },
    {
      label: "Configuration",
      icon: <RiListSettingsLine />,
      path: "/admin/configuration",
    },
    { label: "Logs", icon: <MdOutlineRateReview />, path: "/admin/logs" },
    { label: "Docs", icon: <MdOutlineHelp />, path: "/admin/docs" },
  ],

  auditor: [
    { label: "Dashboard", icon: <IoHomeOutline />, path: "/auditor/dashboard" },
    { label: "CSV Upload", icon: <MdOutlineRequestPage />, path: "/auditor/procurements" },
    { label: "Manual Upload", icon: <MdOutlineAdd className="text-base" />, path: "/auditor/manual-upload" },
    { label: "Review Anomalies", icon: <MdOutlineRateReview />, path: "/auditor/review-anomalies" },
    { label: "Generate Reports", icon: <MdAnalytics className="text-base" />, path: "/auditor/reports" },
  ],

  citizen: [
    { label: "Dashboard", icon: <IoHomeOutline />, path: "/citizen/dashboard" },
    {
      label: "Reviewed Reports",
      icon: <MdOutlineRateReview />,
      path: "/citizen/reviewed-reports",
    },
    {
      label: "Procurement Reviews",
      icon: <FaFileContract />,
      path: "/citizen/procurement-reviews",
    },
  ],
};

const Sidebar = ({ role }) => {
  const showMenu = useSelector((state) => state.Menu.showMenu);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = sidebarConfig[role] || [];
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowLogoutModal(false);
      }
    };

    if (showLogoutModal) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showLogoutModal]);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch({ type: "auth/logout" });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setShowLogoutModal(false);
      navigate("/login");
    }
  };

  return (
    <>
      <aside
        className={`${
          showMenu
            ? "sm:w-64"
            : "sm:w-20 justify-center items-center"
        } sticky top-0 h-screen bg-card/95 border-r border-borderSlate flex flex-col transition-all duration-500 overflow-hidden`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl p-4 font-semibold flex items-center gap-2 text-primary tracking-tight">
            {role === "admin" && <RiAdminLine className="text-2xl" />}
            {role === "auditor" && <TbUserEdit className="text-2xl" />}
            {role === "citizen" && <FaRegUser className="text-2xl" />}

            {showMenu && (
              <span>
                {role.charAt(0).toUpperCase() + role.slice(1)} Portal
              </span>
            )}
          </h1>
        </div>

        {/* MENU */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <ul
            className={`flex flex-col ${
              showMenu ? "" : "items-center"
            } space-y-1`}
          >
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li
                  key={index}
                  className={`flex items-center gap-4 mt-2 rounded-md transition-all duration-150 ${
                    showMenu ? "px-2" : "px-4 justify-center"
                  } font-medium text-md border-l-4 py-3 ${
                    isActive
                      ? "bg-softaccent text-primary border-l-accent shadow-sm"
                      : "border-l-transparent hover:text-primary hover:bg-cleanBlue"
                  }`}
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-4 w-full"
                  >
                    {item.icon}
                    {showMenu && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="border-t border-borderSlate/60 p-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-4 w-full py-3 mt-2 text-red-500 hover:bg-red-50 rounded-md px-2 transition"
          >
            <MdLogout />
            {showMenu && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Confirm Logout
            </h2>

            <p className="mt-3 text-gray-600">
              Are you sure you want to logout?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;