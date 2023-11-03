import React from 'react'
import NavBar from '../../layout/NavBar'
import HotelXpress from '../../assets/Home.jpg'
import style from '../HeroSection/HeroSection.module.css'
import SearchBar from '../SearchBar/SearchBar'
function Header() {
    return (
        <div className={style.heroSection}>
            <NavBar />
            <img className={style.heroImg} src={HotelXpress} alt="Our Hotel" />
            <h1 className={style.slogan}> Take your travels to the next level with our handpicked selection of exceptional stays
            </h1>
            <SearchBar />
        </div>
    )
}

export default Header
