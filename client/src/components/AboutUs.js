import React from "react";
import aboutUsModule from "../styles/aboutUs.module.css";
function AboutUs() {
  return (
    <div className={aboutUsModule.aboutUs}>
      <h1 className={aboutUsModule.aboutUsHeader}>About us</h1>
      <p className={aboutUsModule.aboutUsText}>
        At HotelXpress, we're on a mission to redefine your travel experience.
        Our carefully curated accommodations, user-friendly platform, and
        transparent approach ensure your journey is smooth and memorable. We
        believe where you stay can transform your adventure, and we're committed
        to guiding you to the perfect place to stay. Join our community of
        travelers who trust us to enhance their travels, and let HotelXpress be
        your ultimate travel companion. Your journey, your way.
      </p>
    </div>
  );
}

export default AboutUs;
