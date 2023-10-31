import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styleNav from '../style/NavBar.module.css'
import '../index.css'
import logo from '../assets/logo.png'
import burger from '../assets/burgerNav.png'
function NavBar() {
  const [isCliked, setIsClicked] = useState(false);
  const displayMenu = () => {
    setIsClicked(prv => !prv)
  }
  return (
    <div className={styleNav.NavBar}>
      <img src={logo} alt="HotelXpress" className={styleNav.logo} />
      <nav className={styleNav.navContainer}>
        <ul className={`${styleNav.links}`}>
          <Link to="#nn"> Booking</Link>
          <Link to="#nn"> About Us</Link>
          <Link to="#nn"> Location</Link>
          <Link to="#nn"> Contact</Link>
        </ul>
      </nav>
      <button className={styleNav.logSignButton}>Sign Up</button>
      <button className={styleNav.logSignButton}>Log In </button>
      <img className={styleNav.burger} alt="buger navigation" src={burger} onClick={displayMenu} />
      <div>
        {
          (isCliked)
            ? <nav className={styleNav.navMenu}>
              <ul className={`${styleNav.linksMenu}`}>
                <Link to="#nn"> Booking</Link>
                <Link to="#nn"> About Us</Link>
                <Link to="#nn"> Location</Link>
                <Link to="#nn"> Contact</Link>
                <Link to="#nn"> Log in</Link>
                <Link to="#nn"> Sign up</Link>
              </ul>
            </nav>
            : ''}
      </div>
    </div>
  )
}

export default NavBar;


