import React from "react";

import logoSrc from "../assets/logo.svg";
import styles from "./Header.module.css";

const Header = () => (
  <div>
    <a href="https://idle.finance/" target="_blank" rel="noopener noreferrer">
      <img src={logoSrc} alt="Idle" className={styles.logo} />
    </a>
  </div>
);

export default Header;
