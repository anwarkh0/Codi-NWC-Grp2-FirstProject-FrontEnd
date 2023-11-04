
import Styles from '../NavBar/NavBar.module.css'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'


const Navbar = () => {
  const [collapesed, setCollapsed] = useState(false);

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 600) {
        setCollapsed(false)
      }

    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleClasses = [Styles.linksWrapperMobile, collapesed ? Styles.activeNav : ''].join(' ');
  const bar1 = [Styles.line1, collapesed ? Styles.a : ''].join(' ');
  const bar2 = [Styles.line2, collapesed ? Styles.a : ''].join(' ');
  const bar3 = [Styles.line3, collapesed ? Styles.a : ''].join(' ');

  return (
    <header className={Styles.header}>
      <nav className={Styles.navBar}>
        <a
          className={Styles.logoContainer}
          href="/"
          aria-label="Go to homepage">

          <img src={logo} width={200} height={60} alt="Codi Chronicles Logo" />

        </a>
        <ul className={Styles.linksWrapper}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='room'>Rooms</Link></li>
          <li><Link to='hotel'>Hotels</Link></li>
          <li><Link to='info'>About Us</Link></li>
          <button className={Styles.logSignButton}><Link to='signUp'>Sign Up</Link></button>
          <button className={Styles.logSignButton}><Link to="logIn">Log In</Link></button>

        </ul>
        <ul className={toggleClasses}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='room'>Rooms</Link></li>
          <li><Link to='hotel'>Hotels</Link></li>
          <li><Link to='info'>About Us</Link></li>
          <li><Link to='signUp'>Sign Up</Link></li>
          <li><Link to='logIn'>Log In</Link></li>
        </ul>

        <div className={Styles.burgerButton} onClick={() => setCollapsed(!collapesed)}>
          <div className={bar1}></div>
          <div className={bar2}></div>
          <div className={bar3}></div>
        </div>

      </nav>
    </header>
  )
}


export default Navbar

