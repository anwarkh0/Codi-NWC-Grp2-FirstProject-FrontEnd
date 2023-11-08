import React from "react";
import fb from "../../assets/images/fb.png";
import insta from "../../assets/images/insta.png";
import google from "../../assets/images/google.png";
import footerModule from "./footer.module.css";

function Footer() {
  return (
    <div className={footerModule.footer}>
      <section className={footerModule.desc}>
        <p className={footerModule.text}>
          We provide you with the best offers you can find for all available
          hotels.Connect with us to stay up-to date with all new offers.
        </p>
        <span className={footerModule.logos}>
          <a href="https://www.facebook.com">
            <img alt="fb" src={fb} className={footerModule.logo} />
          </a>
          <a href="httsp://www.instagram.com">
            <img alt="insta" src={insta} className={footerModule.logo} />
          </a>
          <a href="https://www.google.com">
            <img alt="google" src={google} className={footerModule.logo} />
          </a>
        </span>
      </section>
      <section className={footerModule.home}>
        <h3 className={footerModule.homeHeader}>Home</h3>
        <ul className={footerModule.homelist}>
          <li className={footerModule.homeitems}>Booking</li>
          <li className={footerModule.homeitems}>Facilities</li>
          <li className={footerModule.homeitems}>Location</li>
          <li className={footerModule.homeitems}>Contact</li>
        </ul>
      </section>
      <section className={footerModule.help}>
        <h3 className={footerModule.helpHeader}>Help</h3>
        <ul className={footerModule.helplist}>
          <li className={footerModule.helpitems}>About us</li>
          <li className={footerModule.helpitems}>Help center</li>
          <li className={footerModule.helpitems}>Privacy policy</li>
          <li className={footerModule.helpitems}>FAQs</li>
        </ul>
      </section>
      <section className={footerModule.app}>
        <h3 className={footerModule.appHeader}>Get the app</h3>
        <ul className={footerModule.applist}>
          <li className={footerModule.appitems}>IOS app</li>
          <li className={footerModule.appitems}>Android app</li>
        </ul>
      </section>
    </div>
  );
}

export default Footer;
