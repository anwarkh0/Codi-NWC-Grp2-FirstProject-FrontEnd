import React from "react";
import Service from "../../components/Services/Service";
import Testimonials from "../../components/Testimonials/Testimonials";
import HeroSection from "../../components/HeroSection/HeroSection";
import { Helmet } from "react-helmet-async";
import Footer from "../../layouts/footer/Footer";
function Home() {
  return (
    <>
      <Helmet>
        <title>Hotel Xpress - Home</title>
        <meta
          name="description"
          content="Explore our services, client feedback, and more at Hotel Express."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hotel Express - Home" />
        <meta
          property="og:description"
          content="Explore our services, client feedback, and more at Hotel Express."
        />
      </Helmet>
      <HeroSection />
      <Service />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
