import CTA from "../components/landing/CTA";
import Testimonials from "../components/landing/Testimonials";
import Campaigns from "../components/landing/Campaigns";
import HowItWorks from "../components/landing/HowItWorks";
import Statistics from "../components/landing/Statistics";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Footer from "../components/layout/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <HowItWorks />
      <Campaigns />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default LandingPage;