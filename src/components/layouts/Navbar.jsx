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
      <h1>
        <ScrollLink
          to="/"
          className="text-2xl font-bold bg-slate-200 font-heading text-primary px-2 py-1 rounded-md cursor-pointer"
        >
          ProcureGuard
        </ScrollLink>
      </h1>

      {/* Navigation */}
      <div className="hidden md:flex gap-8 items-center text-sm">
        <ScrollLink
          to="features"
          smooth
          duration={500}
          offset={-30}
          className="cursor-pointer hover:text-primary"
        >
          <span className="font-body ">Features</span>
        </ScrollLink>

        <ScrollLink
          to="howitworks"
          smooth
          duration={800}
          offset={-250}
          className="cursor-pointer hover:text-primary"
        >
          <span className="font-body ">How It Works</span>
        </ScrollLink>

        <ScrollLink
          to="about"
          smooth
          duration={500}
          offset={-30}
          className="cursor-pointer hover:text-primary"
        >
          <span className="font-body ">About</span>
        </ScrollLink>

        {/* 🔥 Conditional Rendering */}
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button
                text="Sign In"
                variant="outline"
                className="border border-primary font-serif text-primary hover:bg-primary hover:text-black"
              />
            </Link>

            <Link to="/signup">
              <Button
                text="Get Started"
                className="bg-buttonBg text-white font-serif hover:bg-buttonHover"
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