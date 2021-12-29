import React from "react";
import { GoThreeBars } from "react-icons/go";
import styles from "./Topbar.module.css";

//TODO::::: LOGO should be dynamic
import logoImg from "../../assets/Logo.png";
import UserInfoTopbar from "./UserInfoTopbar/UserInfoTopbar";
import { useDispatch } from "react-redux";
import { toogleSidebarVisibility } from "../../actions/Dashboard.action";

const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className={styles.wrapper}>
      <span
        className={styles.ham}
        onClick={() => dispatch(toogleSidebarVisibility(true))}
      >
        <GoThreeBars />
      </span>
      <img src={logoImg} className={styles.logo} alt="company" />
      <UserInfoTopbar />
    </nav>
  );
};

export default Topbar;
