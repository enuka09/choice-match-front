import React from "react";
import * as styles from "./styles";
import Logo from "../assests/logo/main_logo.png";
import { InformationLinks, MenuLinks } from "./data/footerLinks";
import { IFooterLink } from "./types";
import { Link } from "react-router-dom";
import { Facebook, WhatsApp, Instagram } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer.outer}>
      <div className={styles.footer.inner}>
        <div>
          <img src={Logo} className={styles.footer.logo} alt="Logo" />
          <p className={styles.footer.paragraph}>
            Discover the latest in fashion with CHOICE MATCH! Our online store features AI-powered recommendations,
            personalizing your shopping experience and helping you find the perfect style. Elevate your wardrobe with
            us.
          </p>
        </div>
        <div>
          <div>
            <p className={styles.footer.title}>Find it Fast</p>
            <div className={`${styles.footer.linkContainer} ${styles.footer.text}`}>
              {MenuLinks.map((link: IFooterLink) => (
                <Link key={link.title} to={link.navigation} className={styles.footer.link}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className={styles.footer.title}>Information</p>
            <div className={`${styles.footer.linkContainer} ${styles.footer.text}`}>
              {InformationLinks.map((link: IFooterLink) => (
                <Link key={link.title} to={link.navigation} className={styles.footer.link}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className={styles.footer.title}>get in touch</p>
            <div className={`${styles.footer.linkContainer} ${styles.footer.text}`}>
              <p>
                Hotline :{" "}
                <Link className={styles.footer.link} to="tel:+94769661760">
                  +94 76 966 1760
                </Link>
              </p>
              <p>
                Email :{" "}
                <Link className={styles.footer.link} to="/">
                  info@choicematch.com
                </Link>
              </p>
              <div className={styles.footer.iconContainer}>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <Facebook />
                </Link>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </Link>
                <Link
                  to="https://wa.me/94769661760?text=Hi! I'm interested in your clothing collection. Can you help? "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsApp />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer.copyrightContainer}>
        <p className={styles.footer.copyrightText}>
          <span> &copy; {new Date().getFullYear()} CHOICE MATCH. All rights reserved. </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
