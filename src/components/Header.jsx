import React from 'react';
import { MdOutlineMenuOpen, MdOutlineMenu, MdNotifications } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../redux/features/misc/compSlice';
import { useLocation } from 'react-router-dom';
import { useScreenSize } from '../hooks/useScreen';
import { setScreenType } from '../redux/features/misc/compSlice';
import { setMenuMobile } from '../redux/features/misc/compSlice';

const Header = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector(state => state.Menu.showMenu);
  const screenshow = useSelector(state => state.Menu.screentype === 'desktop');
  const {width} = useScreenSize();


  const handleSidebar = () => {
    if(screenshow){
    dispatch(setMenu());
    }
    else{
      dispatch(setMenuMobile());
    }
  }

  // Get current page from URL
const location = useLocation();
const segments = location.pathname.split("/"); // splits into ["", "admin", "dashboard"]
const pageName = segments[segments.length - 1] || "Dashboard";

const Pageowned = segments[1] || "Dashboard"

// Optional: capitalize first letter
const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <header className='w-full sticky top-0 z-30 p-6 flex items-center justify-between bg-card border-b border-cleanBlue'>
      
      {/* Left section: menu toggle + page name */}
      <div className='flex items-center gap-4'>
        {screenshow && showMenu ? 
          <MdOutlineMenuOpen className='text-2xl cursor-pointer' onClick={handleSidebar} /> 
          : <MdOutlineMenu className='text-2xl cursor-pointer' onClick={handleSidebar} />}
        
        <h2 className='text-xl font-semibold text-textMain capitalize'>{formattedPageName}</h2>
      </div>

      {/* Right section: notifications + user */}
      <div className='flex items-center -z-10 gap-4'>
        <button className='relative'>
          <MdNotifications className='text-2xl text-textSecondary hover:text-primary transition' />
          {/* Optional: notification badge */}
          <span className='absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full'></span>
        </button>

        <div className='flex items-center gap-2 cursor-pointer'>
          <FaUserCircle className='text-2xl text-textSecondary hover:text-primary transition' />
          <span className='text-textMain font-medium'>{Pageowned.charAt(0).toUpperCase() + Pageowned.slice(1)}</span>
        </div>
      </div>

    </header>
  );
}

export default Header;