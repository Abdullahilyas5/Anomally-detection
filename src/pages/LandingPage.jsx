import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Ribbon from "../components/layouts/Ribbon";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Feature";
import Signup from "../components/sections/Signup";
import HowItWorks from "../components/sections/HowItWorks";
import AboutSection from "../components/sections/About";
import DashImage from "../components/DashImage";

const LandingPage = () => {

  return (
    <>
      <Ribbon/>
      <Navbar />
      <Hero />
      <DashImage/>
      <Features />
      <HowItWorks/>
      <AboutSection/>
      <Footer />
    </>
  );
};

export default LandingPage;