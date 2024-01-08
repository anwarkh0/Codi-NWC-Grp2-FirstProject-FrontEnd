import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import KingBedIcon from "@mui/icons-material/KingBed";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import UseApi from "../../hookes/useApi";
import { AuthContext } from "../../context/authContext";

const Sidebar = () => {
  const { apiCall } = UseApi();
  const { setUser, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const adminItems = [
    { item: "Overview", link: "/dashboard/overview", icon: <QueryStatsIcon /> },
    { item: "Users", link: "/dashboard/users", icon: <GroupIcon /> },
    { item: "Hotels", link: "/dashboard/hotels", icon: <ApartmentIcon /> },
    { item: "Rooms", link: "/dashboard/rooms", icon: <KingBedIcon /> },
    { item: "Profile", link: "/profile", icon: <PersonIcon /> },
  ];

  const ManagerItems = [
    { item: "Hotels", link: "/dashboard/hotels", icon: <ApartmentIcon /> },
    { item: "Rooms", link: "/dashboard/rooms", icon: <KingBedIcon /> },
    { item: "Profile", link: "/profile", icon: <PersonIcon /> },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = async () => {
    try {
      await apiCall({
        url: "auth/logout",
        method: "post",
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const ReturnHome = () => {
    navigate("/");
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
            <span
              className={styles["material-symbols-outlined"]}
              style={{
                display: "flex",
              }}
            >
              {isOpen ? (
                <CloseIcon sx={{ color: "white" }} />
              ) : (
                <MenuIcon sx={{ color: "white" }} />
              )}
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
            color: "white",
          }}
        >
          <span>
            {user &&
              user.role === "Admin" &&
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
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      {item.icon}
                    </span>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "white",
                      }}
                    >
                      {item.item}
                    </p>
                  </button>
                </Link>
              ))}
            {user &&
              user.role === "Hotel Manager" &&
              ManagerItems.map((item) => (
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
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      {item.icon}
                    </span>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "white",
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
              onClick={() => ReturnHome()}
            >
              <span>
                <HomeIcon
                  sx={{
                    color: "white",
                  }}
                />
              </span>
              <p
                style={{
                  fontFamily: "outfit",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Home
              </p>
            </button>
            <button
              className={`${styles["sidebar-button"]} ${styles.button}`}
              tabIndex="0"
              onClick={() => handleLogout()}
            >
              <span>
                <LogoutIcon
                  sx={{
                    color: "white",
                  }}
                />
              </span>
              <p
                style={{
                  fontFamily: "outfit",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "white",
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
