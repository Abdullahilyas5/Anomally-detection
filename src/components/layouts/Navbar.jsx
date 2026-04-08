import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user , role } = useSelector((state) => state.auth);
  


  // 🎯 Dashboard redirect logic
  const handleDashboardRedirect = () => {
    if (!role) return;

    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "auditor":
        navigate("/auditor/dashboard");
        break;
      default:
        navigate("/citizen/dashboard");
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center px-6 md:px-12 py-4 z-10 bg-card border-b border-borderSlate sticky top-0"
    >
      {/* Logo */}
      <ScrollLink
        to="/"
        className="text-2xl font-heading text-primary font-extrabold cursor-pointer"
      >
        ProcureGuard
      </ScrollLink>

      {/* Navigation */}
      <div className="hidden md:flex gap-8 items-center text-sm">
        <ScrollLink
          to="features"
          smooth
          duration={500}
          offset={-30}
          className="cursor-pointer hover:text-primary"
        >
          Features
        </ScrollLink>

        <ScrollLink
          to="howitworks"
          smooth
          duration={800}
          offset={-250}
          className="cursor-pointer hover:text-primary"
        >
          How It Works
        </ScrollLink>

        <ScrollLink
          to="about"
          smooth
          duration={500}
          offset={-30}
          className="cursor-pointer hover:text-primary"
        >
          About
        </ScrollLink>

        {/* 🔥 Conditional Rendering */}
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button
                text="Sign In"
                variant="outline"
                className="border border-primary text-primary hover:bg-primary hover:text-white"
              />
            </Link>

            <Link to="/signup">
              <Button
                text="Get Started"
                className="bg-buttonBg text-white hover:bg-buttonHover"
              />
            </Link>
          </>
        ) : (
          <Button
            text="Dashboard"
            onClick={handleDashboardRedirect}
            className="bg-buttonBg text-white hover:bg-buttonHover"
          />
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;