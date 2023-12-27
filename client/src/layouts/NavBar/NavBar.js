import Styles from "../NavBar/NavBar.module.css";
import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/authContext";
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import MenuSimple from "../../components/DropDownList";
const Navbar = () => {
  const [collapesed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 600) {
        setCollapsed(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const toggleClasses = [
    Styles.linksWrapperMobile,
    collapesed ? Styles.activeNav : "",
  ].join(" ");
  const bar1 = [Styles.line1, collapesed ? Styles.a : ""].join(" ");
  const bar2 = [Styles.line2, collapesed ? Styles.a : ""].join(" ");
  const bar3 = [Styles.line3, collapesed ? Styles.a : ""].join(" ");
  const stylo = ({ isActive }) => {
    return {
      borderBottom: isActive ? "1px solid gold" : "none",
      color: isActive ? "#088395" : "black",
    };
  };
  return (
    <header className={Styles.header}>
      <nav className={Styles.navBar}>
        <a
          className={Styles.logoContainer}
          href="/"
          aria-label="Go to homepage"
        >
          <img src={logo} width={200} height={60} alt="HotelXpress" />
        </a>
        <ul className={Styles.linksWrapper}>
          <li>
            <NavLink style={stylo} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={stylo} to="/room">
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink style={stylo} to="/hotel">
              Hotels
            </NavLink>
          </li>
          <li>
            <NavLink style={stylo} to="/info">
              About Us
            </NavLink>
          </li>
        </ul>
        {!user ? (
          <ul className={Styles.right}>
            <Link to="signUp" className={Styles.link}>
              <li className={Styles.logSignButton}>Sign Up</li>
            </Link>
            <Link to="logIn" className={Styles.link}>
              <li className={Styles.logSignButton}>Log In</li>
            </Link>
          </ul>
        ) : (<>
          <MenuSimple className={Styles.menue}/>
         </>
        )}
        <ul className={toggleClasses}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/room">Rooms</Link>
          </li>
          <li>
            <Link to="/hotel">Hotels</Link>
          </li>
          <li>
            <Link to="/info">About Us</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/signUp">Sign Up</Link>
              </li>
              <li>
                <Link to="/logIn">Log In</Link>
              </li>
            </>
          )}
        </ul>

        <div
          className={Styles.burgerButton}
          onClick={() => setCollapsed(!collapesed)}
        >
          <div className={bar1}></div>
          <div className={bar2}></div>
          <div className={bar3}></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
