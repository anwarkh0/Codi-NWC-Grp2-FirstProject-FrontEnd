import React from "react";
import NavBar from "../../layouts/NavBar/NavBar";
import HotelXpress from "../../assets/images/Home.jpg";
import style from "../../components/HeroSection/HeroSection.module.css";
import SearchBar from "../SearchBar/SearchBar";
function HeroSection() {
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
