import React from "react";
import styles from "./UserInfoTopbar.module.css";

const UserInfoTopbar = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>John Doe</span>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        className={styles.image}
        alt=""
      />
    </div>
  );
};

export default UserInfoTopbar;
