import React from "react";
import { GoThreeBars } from "react-icons/go";
import styles from "./Topbar.module.css";

//TODO::::: LOGO should be dynamic
import logoImg from "../../assets/Logo.png";
import UserInfoTopbar from "./UserInfoTopbar/UserInfoTopbar";

const Topbar = () => {
  return (
    <nav className={styles.wrapper}>
      <span className={styles.ham}>
        <GoThreeBars />
      </span>
      <img src={logoImg} className={styles.logo} alt="company" />
      <UserInfoTopbar />
    </nav>
  );
};

export default Topbar;
