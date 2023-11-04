import React from "react";
import HomeFooter from "../../components/HomeFooter/HomeFooter";
import Service from "../../components/Services/Service";
import Testimonials from "../../components/Testimonials/Testimonials";
import HeroSection from '../../components/HeroSection/HeroSection'
import Footer from '../../layouts/footer/Footer'
function Home() {
  return (
    <>
    <HeroSection/>
      <Service /> 
       <Testimonials />
       <Footer />
      <HomeFooter />
    
    </>
  );
}

export default Home;
