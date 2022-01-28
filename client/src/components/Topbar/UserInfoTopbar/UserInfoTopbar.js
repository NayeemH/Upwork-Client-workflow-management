import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../actions/Profile.action";
import { IMAGE_PATH } from "../../../constants/URL";
import { useNavigate } from "react-router-dom";
import styles from "./UserInfoTopbar.module.css";

const UserInfoTopbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const clickHandler = () => {
    navigate("/settings");
  };

  useEffect(() => {
    dispatch(getAuthUser());
  }, []);
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{user.username}</span>
      <div className={styles.img_wrapper}>
        <img
          src={`${IMAGE_PATH}small/${user?.image}`}
          className={styles.image}
          alt={`${user?.username}'s profile`}
          onClick={clickHandler}
        />
      </div>
    </div>
  );
};

export default UserInfoTopbar;
