import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import KingBedIcon from '@mui/icons-material/KingBed';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const adminItems = [
    { item: "Overview", link: "/dashboard/overview", icon: <QueryStatsIcon /> },
    { item: "Users", link: "/dashboard/users", icon: <GroupIcon /> },
    { item: "Hotels", link: "/dashboard/hotels", icon: <ApartmentIcon /> },
    { item: "Rooms", link: "/dashboard/rooms", icon: <KingBedIcon /> },
    { item: "Profile", link: "/profile", icon: <PersonIcon /> },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles["sidebar-inner"]}>
        <header className={styles["sidebar-header"]}>
          <button
            type="button"
            className={`${styles["sidebar-burger"]} ${styles.button} `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles["material-symbols-outlined"]} style={{
                display : 'flex'
            }}>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </span>
          </button>
        </header>
        <nav
          className={styles["sidebar-menu"]}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "90vh",
          }}
        >
          <span>
            {adminItems &&
              adminItems.map((item) => (
                <Link
                  to={item.link}
                  key={item.item}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    type="button"
                    className={`${styles["sidebar-button"]} ${styles.button} ${
                      selectedItem === item ? styles.selected : ""
                    }`}
                    tabIndex="0"
                    onClick={() => handleItemClick(item)}
                  >
                    <span>{item.icon}</span>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.item}
                    </p>
                  </button>
                </Link>
              ))}
          </span>
          <span>
            <button
              className={`${styles["sidebar-button"]} ${styles.button}`}
              tabIndex="0"
              onClick={() => handleLogout()}
            >
              <span>
                <LogoutIcon />
              </span>
              <p
                style={{
                  fontFamily: "outfit",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Logout
              </p>
            </button>
          </span>
        </nav>
      </div>
    </nav>
  );
};

export default Sidebar;
