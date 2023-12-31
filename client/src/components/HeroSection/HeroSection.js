import React from "react";
import HotelXpress from "../../assets/images/Home.jpg";
import style from "./HeroSection.module.css";
import SearchBar from "../SearchBar/SearchBar";
const  HeroSection = () => {
  return (
    <div className={style.heroSection}>
      <img className={style.heroImg} src={HotelXpress} alt="Our Hotel" />
      <h1 className={style.slogan}>
        {" "}
        Take your travels to the next level with our handpicked selection of
        exceptional stays
      </h1>
      <SearchBar />
    </div>
  );
}

export default HeroSection;
