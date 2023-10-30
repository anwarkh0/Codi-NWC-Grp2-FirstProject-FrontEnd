import React from 'react'
import styleNav from '../style/NavBar.module.css'
import '../index.css'
import logo from '../assets/logo.png'
function NavBar() {
  return (
    <div className={styleNav.NavBar}>
      <img src={logo} alt="HotelXpress" className={styleNav.logo} width={280} height={120} />
      <nav className={styleNav.navContainer}>
        <ul className={styleNav.links}>
          <a href="#nn"> <li>Booking</li></a>
          <a href="#nn"> <li>About Us</li></a>
          <a href="#nn"> <li>Location</li></a>
          <a href="#nn"> <li>Contact</li></a>
        </ul>
      </nav>
      <button className={styleNav.logSignButton}>Sign Up</button>
      <button className={styleNav.logSignButton}>Log In </button>
    </div>
  )
}

export default NavBar;