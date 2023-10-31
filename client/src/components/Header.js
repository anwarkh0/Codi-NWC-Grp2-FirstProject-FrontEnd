import React from 'react'
import NavBar from '../layout/NavBar'
import HotelXpress from '../assets/Home.jpg'
import HeaderStyle from '../style/Header.module.css'
import SearchBar from './SearchBar'
function Header() {
    return (
        <div className={HeaderStyle.container}>
            <NavBar />
            <img className={HeaderStyle.HeroImage} src={HotelXpress} alt="Our Hotel" />
            <p className={HeaderStyle.slogan}> Take your travels to the next level with our handpicked selection of exceptional stays
            </p>
            <SearchBar />
        </div>
    )
}

export default Header
