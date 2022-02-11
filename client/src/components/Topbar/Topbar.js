import React from "react";
import { GoThreeBars } from "react-icons/go";
import styles from "./Topbar.module.css";
import UserInfoTopbar from "./UserInfoTopbar/UserInfoTopbar";
import { useDispatch, useSelector } from "react-redux";
import { toogleSidebarVisibility } from "../../actions/Dashboard.action";
import { useNavigate } from "react-router-dom";

//TODO::::: LOGO should be dynamic
import logoImg from "../../assets/Logo.png";
import { IMAGE_PATH } from "../../constants/URL";

const Topbar = () => {
  const dispatch = useDispatch();
  const domain = useSelector((state) => state.domain);
  const navigate = useNavigate();

  return (
    <nav className={styles.wrapper}>
      <span
        className={styles.ham}
        onClick={() => dispatch(toogleSidebarVisibility(true))}
      >
        <GoThreeBars />
      </span>
      <img
        src={`${IMAGE_PATH}small/${domain.logo}`}
        className={styles.logo}
        alt="company"
        onClick={() => navigate("/dashboard")}
      />
      <UserInfoTopbar />
    </nav>
  );
};

export default Topbar;
