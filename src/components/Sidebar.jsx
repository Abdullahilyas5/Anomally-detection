import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { MdLogout, MdOutlineRateReview, MdAnalytics } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { FaRegUser, FaFileContract, FaComment } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";

// Sidebar config with paths
const sidebarConfig = {
  admin: [
    { label: "Dashboard", icon: <IoHome />, path: "/admin/dashboard" },
    { label: "Users", icon: <FaRegUser />, path: "/admin/users" },
    { label: "Anomalies", icon: <CgDanger />, path: "/admin/anomalies" },
    { label: "Configuration", icon: <IoMdSettings />, path: "/admin/configuration" },
    { label: "Logs", icon: <MdOutlineRateReview />, path: "/admin/logs" },
  ],
  editor: [
    { label: "Dashboard", icon: <IoHome />, path: "/editor/dashboard" },
    { label: "Procurements", icon: <FaFileContract />, path: "/editor/procurements" },
    { label: "Review Anomalies", icon: <MdOutlineRateReview />, path: "/editor/review-anomalies" },
    { label: "Comments", icon: <FaComment />, path: "/editor/comments" },
    { label: "Analytics", icon: <MdAnalytics />, path: "/editor/analytics" },
  ],
  citizen: [
    { label: "Dashboard", icon: <IoHome />, path: "/citizen/dashboard" },
    { label: "Reviewed Reports", icon: <MdOutlineRateReview />, path: "/citizen/reviewed-reports" },
    { label: "Procurement Reviews", icon: <FaFileContract />, path: "/citizen/procurement-reviews" },
  ],
};

const Sidebar = ({ role }) => {
  const showMenu = useSelector((state) => state.Menu.showMenu);
  const menuItems = sidebarConfig[role] || [];
  const location = useLocation(); // Get current route

  const PortalLabel = {
    admin: <RiAdminLine className={`${showMenu ? "text-2xl" : "text-3xl"} font-bold`} />,
    editor: <TbUserEdit className={`${showMenu ? "text-2xl" : "text-3xl"} font-bold`} />,
    citizen: <FaRegUser className={`${showMenu ? "text-2xl" : "text-3xl"} font-bold`} />,
  };

  return (
    <aside className={`${showMenu ? "w-64" : "w-20 justify-center items-center rounded-2xl"} bg-card border-r border-borderSlate flex transition-all duration-700 h-screen overflow-hidden flex-col`}>

      <h1 className="text-xl p-4 font-semibold flex cursor-pointer justify-start mt-4 items-center gap-2 text-primary tracking-tight">
        {PortalLabel[role]}
        {showMenu && (
          <span className={`transition-opacity duration-500 ease-in-out ${showMenu ? "opacity-100 delay-300" : "opacity-0"}`}>
            {role.charAt(0).toUpperCase() + role.slice(1)} Portal
          </span>
        )}
      </h1>

      <div className={`mt-auto w-full flex-1 ${showMenu ? "p-4" : "py-4 px-1"}`}>
        <ul className={`flex flex-col ${showMenu ? "" : "items-center text-xl"} h-full justify-between`}>

          <div>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path; // check active
              return (
                <li
                  key={index}
                  className={`flex gap-4 cursor-pointer text-slate-800 transition-all duration-75 delay-75 text-wrap items-center justify-start ${isActive ? " " :  "hover:text-primary hover:bg-cleanBlue"} py-3 rounded-md ${showMenu ? "hover:border-r-2 px-2" : "px-4"} font-medium text-md border-primary
                    ${isActive ? "bg-softaccent text-primary border-r-2 border-r-accent" : ""}
                  `}
                >
                  <Link to={item.path} className="flex items-center gap-4 w-full">
                    {item.icon}
                    {showMenu && <span>{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </div>

          <div>
            {/* Settings */}
            <li className={`flex gap-4 cursor-pointer hover:text-primary hover:bg-cleanBlue text-slate-800 transition-all duration-75 delay-75 text-wrap items-center justify-start py-3 rounded-md ${showMenu ? "hover:border-r-2 px-2" : "px-4"} font-medium text-md border-primary`}>
              <IoMdSettings />
              {showMenu && <span>Settings</span>}
            </li>

            {/* Logout */}
            <li className={`flex gap-4 cursor-pointer hover:text-accent hover:bg-softBlue text-slate-800 transition-all duration-75 delay-75 text-wrap items-center justify-start py-3 rounded-md ${showMenu ? "hover:border-r-2 px-2" : "px-4"} font-medium text-md border-accent`}>
              <MdLogout />
              {showMenu && <span>Logout</span>}
            </li>
          </div>

        </ul>
      </div>

    </aside>
  )
}

export default Sidebar;