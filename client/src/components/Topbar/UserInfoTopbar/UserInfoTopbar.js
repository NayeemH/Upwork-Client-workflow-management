import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../actions/Profile.action";
import { IMAGE_PATH } from "../../../constants/URL";
import { useNavigate } from "react-router-dom";
import {
  NavDropdown,
  MenuItem,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
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

      <DropdownButton
        variant="transparent"
        className={styles.dropdown}
        title={
          <div className={styles.img_wrapper}>
            <img
              src={`${IMAGE_PATH}small/${user?.image}`}
              className={styles.image}
              alt={`${user?.username}'s profile`}
            />
          </div>
        }
        id="input-group-dropdown-1"
      >
        <Dropdown.Item href="#">Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#">Separated link</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default UserInfoTopbar;
