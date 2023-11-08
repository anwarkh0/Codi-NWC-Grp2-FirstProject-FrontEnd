import React from "react";
import Service from "../../components/Services/Service";
import Testimonials from "../../components/Testimonials/Testimonials";
import HeroSection from "../../components/HeroSection/HeroSection";
import Footer from "../../layouts/footer/Footer";
function Home() {
  return (
    <>
      <HeroSection />
      <Service />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
