import React from "react";
import aboutUsModule from "./aboutUs.module.css";
function AboutUs() {
  return (
    <section className={aboutUsModule.aboutUs}>
      <p className={aboutUsModule.aboutUsHeader}>About us</p>
      <p className={aboutUsModule.aboutUsText}>
        At HotelXpress, we're on a mission to redefine your travel experience.
        Our carefully curated accommodations, user-friendly platform, and
        transparent approach ensure your journey is smooth and memorable. We
        believe where you stay can transform your adventure, and we're committed
        to guiding you to the perfect place to stay. Join our community of
        travelers who trust us to enhance their travels, and let HotelXpress be
        your ultimate travel companion. Your journey, your way.
      </p>
    </section>
  );
}

export default AboutUs;
