import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../actions/Profile.action";
import { IMAGE_PATH } from "../../../constants/URL";
import styles from "./UserInfoTopbar.module.css";

const UserInfoTopbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAuthUser());
  }, []);
  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{user.username}</span>
      <img
        src={`${IMAGE_PATH}small/${user?.image}`}
        className={styles.image}
        alt={`${user?.username}'s profile`}
      />
    </div>
  );
};

export default UserInfoTopbar;
