import React from 'react'
import styleNav from '../style/NavBar.module.css'
import logo from '../assets/logo.png'
function NavBar() {
  return (
    <div>
      <img src={logo} alt="HotelXpress" className={styleNav.logo} width={340} height={170}/>
      <nav className={styleNav.nav}>
        <ul className={styleNav.links}>
          <li>Booking</li>
          <li>About Us</li>
          <li>Location</li>
          <li>Contact</li>
        </ul>
        <button className={styleNav.logSignButton}>Sign Up</button>
        <button  className={styleNav.logSignButton}>Log In </button>
      </nav>
    </div>
  )
}

export default NavBar;