import React from "react";
import { Title } from "@gnosis.pm/safe-react-components";

import logoSrc from "../assets/logo.svg";
import styles from "./Header.module.css";

const Header = () => (
  <div className={styles.component}>
    <a href="https://idle.finance/" target="_blank" rel="noopener noreferrer">
      <img src={logoSrc} alt="Idle" className={styles.logo} />
    </a>
    <Title size="xs">
      Earn the yield you deserve without worry about finding the best option,
      either if you want to optimize returns or risks.{" "}
      <a
        className={styles.link}
        href="https://idle.finance/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more here.
      </a>
    </Title>
  </div>
);

export default Header;
