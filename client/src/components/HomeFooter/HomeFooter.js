import React from "react";
import fb from "../../assets/images/bwFb.png";
import twitter from "../../assets/images/bwTwitter.png";
import insta from "../../assets/images/bwInsta.png";
import homeFooterModule from "./homeFooter.module.css";

function HomeFooter() {
  return (
    <div className={homeFooterModule.homeFooter}>
      <div className={homeFooterModule.upperSide}>
        <section className={homeFooterModule.chunck}>
          <h3 className={homeFooterModule.header}>Project Team</h3>
          <ul className={homeFooterModule.members}>
            <li className={homeFooterModule.member}>Souheir Al Jammal</li>
            <li className={homeFooterModule.member}>Yahya Nashar</li>
          </ul>
        </section>
        <section className={homeFooterModule.chunck}>
          <h3 className={homeFooterModule.header}>Aim</h3>
          <p className={homeFooterModule.text}>
            Building a Web application that lets you find the perfect resort.
          </p>
        </section>
        <section className={homeFooterModule.chunck}>
          <h3 className={homeFooterModule.header}>Disclaimer</h3>
          <p className={homeFooterModule.text}>
            We do not intend identity theft,the features and hotels listed on
            this website are whether artificially made, or used for learning and
            non profitable reasons
          </p>
        </section>
        <section className={homeFooterModule.chunck}>
          <h3 className={homeFooterModule.header}>About</h3>
          <ul className={homeFooterModule.aboutList}>
            <li className={homeFooterModule.aboutItem}>Grp#2 - NWC - CODI</li>
            <li className={homeFooterModule.aboutItem}>First Alumn Project</li>
            <li className={homeFooterModule.aboutItem}>
              Alumn: Mahmoud Klekish
            </li>
            <li className={homeFooterModule.aboutItem}>Company: Codi</li>
          </ul>
        </section>
      </div>
      <div className={homeFooterModule.lowerSide}>
        <section className={homeFooterModule.westSide}>
          <p className={homeFooterModule.companyName}>
            © 2023 HotelXpress, Inc.
          </p>
        </section>
        <section className={homeFooterModule.eastSide}>
          <ul className={homeFooterModule.companyLinks}>
            <li className={homeFooterModule.links}>
              <a href="https://www.facebook.com">
                <img src={fb} className={homeFooterModule.logo} alt='Facebook' />
              </a>
            </li>
            <li className={homeFooterModule.links}>
              <a href="httsp://www.twitter.com">
                <img src={twitter} className={homeFooterModule.logo}  alt='twitter'/>
              </a>
            </li>
            <li className={homeFooterModule.links}>
              <a href="https://www.insta.com">
                <img src={insta} className={homeFooterModule.logo} alt='insta'/>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default HomeFooter;
