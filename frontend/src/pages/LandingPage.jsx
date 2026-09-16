import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CTA from "../components/landing/CTA";
import Campaigns from "../components/landing/Campaigns";
import HowItWorks from "../components/landing/HowItWorks";
import Statistics from "../components/landing/Statistics";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Footer from "../components/layout/Footer";

function LandingPage() {
  const { hash } = useLocation();

  useEffect(() => {
    const targetId = hash ? hash.slice(1) : "home";
    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <HowItWorks />
      <Campaigns />
      <CTA />
      <Footer />
    </>
  );
}

export default LandingPage;
