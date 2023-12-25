import React from "react";
import aboutUsModule from "./aboutUs.module.css";
import Aboutus from "../../assets/images/about us.jpg";
function AboutUs() {
  return (
    <>
      <section className={aboutUsModule.sectionone}>
        <div className={aboutUsModule.partone}>
          <h1 className={aboutUsModule.title}>Welcome to HotelXpress</h1>
          <p className={aboutUsModule.text}>
            At HotelXpress, we specialize in connecting you to the ideal room
            for your stay, right within the heart of exceptional hotels. We're
            dedicated to simplifying your search for the perfect space, offering
            a wide selection of individual rooms tailored to your preferences.
            Discover comfort, convenience, and quality lodging options, all at
            your fingertips.
          </p>
        </div>
        <img alt="hotel" src={Aboutus} className={aboutUsModule.image}></img>
      </section>
      <section className={aboutUsModule.sectiontwo}>
        <h2 className={aboutUsModule.title}>Our Commitment</h2>
        <p className={aboutUsModule.text}>
          we are dedicated to making your booking experience effortless while
          providing an extensive array of options and unmatched convenience.
          Carefully curated, our selection includes a diverse range of hotels,
          each meticulously chosen to offer you an extraordinary stay. From
          intimate boutique accommodations to opulent resorts, we've handpicked
          every establishment to ensure that each stay stands out as a distinct
          and unforgettable experience.
        </p>
      </section>
    </>
  );
}

export default AboutUs;
