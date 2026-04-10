import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { MdLogout, MdOutlineRateReview, MdOutlineMenu, MdOutlineMenuOpen, MdKeyboardArrowDown, MdKeyboardArrowUp, MdAnalytics, MdOutlineRequestPage, MdOutlineAdd, MdOutlineHelp } from "react-icons/md";
import { RiAdminLine, RiListSettingsLine } from "react-icons/ri";
import { TbUserEdit, TbReportSearch } from "react-icons/tb";
import { FaRegUser, FaFileContract, FaFileCsv, FaFilePdf } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa6";
import { setMenu, setMenuMobile } from '../redux/features/misc/compSlice';
import { useScreenSize } from '../hooks/useScreen';
import LogoutModal from './Admin/Logout';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
import AutoModeSharpIcon from '@mui/icons-material/AutoModeSharp';

// Custom scrollbar styles
const scrollbarStyles = `
  .sidebar-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .sidebar-scroll::-webkit-scrollbar-thumb {
    background: rgb(59, 130, 246, 0.4);
    border-radius: 3px;
  }
  .sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background: rgb(59, 130, 246, 0.6);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = scrollbarStyles;
  if (!document.querySelector('style[data-sidebar-scrollbar]')) {
    styleSheet.setAttribute('data-sidebar-scrollbar', 'true');
    document.head.appendChild(styleSheet);
  }
}
const sidebarConfig = {
  admin: [
    { label: "Dashboard", icon: <IoHomeOutline />, path: "/admin/dashboard" },
    { label: "Users", icon: <FaRegUser />, path: "/admin/users" },
    {
      label: "Model",
      icon: <ModelTrainingRoundedIcon className='font-medium'/>,
      children: [
        { label: "Train Model", icon: <MdAnalytics className="text-base" />, path: "/admin/train" },
        { label: "Model Configuration", icon: <RiListSettingsLine className="text-base" />, path: "/admin/model-configuration" },
        // { label: "Add Procurement", icon: <MdOutlineAdd className="text-base" />, path: "/admin/add-procurement" },
      ]
    },
    { label: "Anomalies", icon: <CgDanger />, path: "/admin/anomalies" },
    { label: "Configuration", icon: <RiListSettingsLine />, path: "/admin/configuration" },
    { label: "Logs", icon: <MdOutlineRateReview />, path: "/admin/logs" },
    { label: "Docs", icon: <MdOutlineHelp />, path: "/admin/docs" },
  ],
  auditor: [
    { label: "Dashboard", icon: <IoHomeOutline />, path: "/auditor/dashboard" },
    { label: "CSV Upload", icon: <MdOutlineRequestPage />, path: "/auditor/procurements" },
    { label: "Manual Upload", icon: <MdOutlineAdd className="text-base" />, path: "/auditor/manual-upload" },
    // { label: "CSV Upload", icon: <FaFileCsv className="text-base" />, path: "/auditor/csv-upload" },
    { label: "PDF Upload", icon: <FaFilePdf className="text-base" />, path: "/auditor/pdf-upload" },
    { label: "Review Anomalies", icon: <MdOutlineRateReview />, path: "/auditor/review-anomalies" },
  ],
  citizen: [
    { label: "Dashboard", icon: <IoHomeOutline />, path: "/citizen/dashboard" },
    { label: "Reviewed Reports", icon: <MdOutlineRateReview />, path: "/citizen/reviewed-reports" },
    { label: "Procurement Reviews", icon: <FaFileContract />, path: "/citizen/procurement-reviews" },
  ],
};

const Sidebar = ({ role }) => {
  const showMenu = useSelector((state) => state.Menu.showMenu);
  const menuItems = sidebarConfig[role] || [];
  const location = useLocation(); // Get current route
  const [isWidth, setWidth] = useState();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({});

  // Auto-expand groups when a child route is active
  useEffect(() => {
    const activeGroup = menuItems.find(item => 
      item.children?.some(child => location.pathname === child.path)
    );
    if (activeGroup && !openGroups[activeGroup.label]) {
      setOpenGroups(prev => ({ ...prev, [activeGroup.label]: true }));
    }
  }, [location.pathname, menuItems]);

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const PortalLabel = {
    admin: <RiAdminLine className={`${showMenu ? "text-2xl" : "text-3xl"} font-bold`} />,
    auditor: <TbUserEdit className={`${showMenu ? "text-2xl" : "text-3xl"} font-bold`} />,
    citizen: <FaRegUser className={`${showMenu ? "text-2xl" : "text-3xl"} font-bold`} />,
  };



  return (
    <aside className={`${showMenu ? "sm:w-64" : "sm:w-20 justify-center items-center rounded-2xl"} sticky top-0 sm:max-w-full h-screen bg-card/95 border-r border-borderSlate flex transition-all duration-700 overflow-hidden flex-col shadow-xl`}>

      <div className='flex items-center justify-between w-full'>
        <h1 className="text-xl p-4 font-semibold flex cursor-pointer justify-start mt-4 items-center gap-2 text-primary tracking-tight">
          {PortalLabel[role]}
          {showMenu && (
            <span className={`transition-opacity duration-500 ease-in-out ${showMenu ? "opacity-100 delay-300" : "opacity-0"}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)} Portal
            </span>
          )}
        </h1>
      </div>

      <div className={`w-full flex-1 min-h-0 ${showMenu ? "p-4" : "py-4 px-1"} flex flex-col`}>
        <div className="flex-1 min-h-0 overflow-y-auto pr-2 sidebar-scroll">
          <ul className={`flex flex-col ${showMenu ? "" : "items-center text-xl"} space-y-1`}>
            {menuItems.map((item, index) => {
              const hasChildren = Array.isArray(item.children) && item.children.length > 0;
              const isActive = item.path ? location.pathname === item.path : item.children?.some((child) => location.pathname === child.path);
              const isGroupOpen = openGroups[item.label];

              if (hasChildren) {
                return (
                  <li key={index} className="mt-2">
                    <button
                      type="button"
                      onClick={() => toggleGroup(item.label)}
                      className={`flex w-full items-center justify-between gap-4 text-slate-800 transition-all duration-150 text-wrap py-3 rounded-md ${showMenu ? "px-2" : "px-4"} font-medium text-md border-l-4 ${isActive || isGroupOpen ? "bg-blue-50 text-primary border-l-accent shadow-sm" : "border-l-transparent hover:text-primary hover:bg-cleanBlue"}`}
                    >
                      <span className="flex items-center gap-4 w-full">
                        {item.icon}
                        {showMenu && <span>{item.label}</span>}
                      </span>
                      {showMenu && (isGroupOpen ? <MdKeyboardArrowUp className="text-xl" /> : <MdKeyboardArrowDown className="text-xl" />)}
                    </button>

                    {showMenu && isGroupOpen && (
                      <ul className="mt-2 space-y-2">
                        {item.children.map((child, childIndex) => {
                          const childActive = location.pathname === child.path;
                          return (
                            <li key={childIndex}>
                              <Link
                                to={child.path}
                                className={`flex items-center gap-3 text-slate-700 rounded-md px-3 py-2 text-sm transition-colors duration-150 border-l-4 ${childActive ? "bg-cleanBlue text-primary font-semibold border-l-accent shadow-sm" : "border-l-transparent hover:text-primary hover:bg-cleanBlue"}`}
                              >
                                {child.icon}
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  className={`flex gap-4 cursor-pointer text-slate-800 mt-2 transition-all duration-150 text-wrap items-center justify-start rounded-md ${showMenu ? "hover:border-r-2 px-2" : "px-4"} font-medium text-md border-l-4 ${isActive ? "bg-softaccent text-primary border-l-accent shadow-sm" : "border-l-transparent hover:text-primary hover:bg-cleanBlue"} py-3`}
                >
                  <Link to={item.path} className="flex items-center gap-4 w-full">
                    {item.icon}
                    {showMenu && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-4 border-t border-borderSlate/60 pt-4 flex-shrink-0">
          <button
            type="button"
            onClick={() => navigate(`/${role}/settings`)}
            className={`flex w-full gap-4 items-center ${showMenu ? "justify-start" : "justify-center"} text-slate-800 hover:text-primary hover:bg-cleanBlue transition-all duration-150 rounded-md py-3 ${showMenu ? "px-2" : "px-4"}`}
          >
            <IoMdSettings />
            {showMenu && <span>Settings</span>}
          </button>

          <button
            type="button"
            onClick={() => navigate("/logout")}
            className={`flex w-full gap-4 items-center ${showMenu ? "justify-start" : "justify-center"} text-slate-800 hover:text-accent hover:bg-softBlue transition-all duration-150 rounded-md py-3 mt-2 ${showMenu ? "px-2" : "px-4"}`}
          >
            <MdLogout />
            {showMenu && <span>Logout</span>}
          </button>
        </div>
      </div>


    </aside>
  )
}

export default Sidebar;