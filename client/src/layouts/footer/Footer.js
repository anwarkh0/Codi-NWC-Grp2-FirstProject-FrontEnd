import React from "react";
import fb from "../../assets/images/bwFb.png";
import insta from "../../assets/images/bwInsta.png";
import google from "../../assets/images/bwGoogle.png";
import footerModule from "./footer.module.css";
import styles from "./footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import logo from './logo.png'

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.top}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.links}>
          <div className={styles.linksColumn}>
            <h2 className={styles.h2}>Get Started</h2>
            <p className={styles.p}>
            We provide you with the best offers you can find for all available
            hotels.Connect with us to stay up-to date with all new offers.
            </p>
          </div>
          <div className={styles.linksColumn}>
            <h2 className={styles.h2}>Pages</h2>
            <Link className={styles.link} to={'/'}>Home</Link>
            <Link className={styles.link} to={'/hotel'}>Hotels</Link>
            <Link className={styles.link} to={'/room'}>Room</Link>
            <Link className={styles.link} to={'/info'}>About Us</Link>
          </div>
          <div className={`${styles.linksColumn} ${styles.socialsColumn}`}>
            <h2 className={styles.h2}>Social Media</h2>
            <p className={styles.p}>
              Follow us on social media to find out the latest updates on our
              progress.
            </p>
            <div className={styles.socials}>
              <Link
                to="www.facebook.com"
                className={`${styles.socialIcon}`}
              >
                <FacebookRoundedIcon />
              </Link>
              <Link
                to="www.Instagram.com"
                className={`${styles.socialIcon}`}
              >
                <InstagramIcon />
              </Link>
              <Link
                to=""
                className={`${styles.socialIcon}`}
              >
                <WhatsAppIcon />
              </Link>
            </div>
          </div>
        </div>
        </div>
        <div className={styles.bottom}>
        <p className={styles.copyright}>© 2023 All rights reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
