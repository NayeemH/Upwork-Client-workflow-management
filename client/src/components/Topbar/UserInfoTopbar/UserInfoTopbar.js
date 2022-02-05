import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import { logout } from "../../../actions/Dashboard.action";

const UserInfoTopbar = ({ user, logout, getAuthUser }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/settings");
  };

  const logoutHandeler = async () => {
    let check = await logout();
    if (check === true) {
      navigate("/");
    }
  };

  useEffect(() => {
    getAuthUser();
  }, []);
  return (
    <div className={styles.wrapper} id="user">
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
        <Dropdown.Item
          className={styles.dropdown_item}
          href="#"
          onClick={clickHandler}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          className={styles.dropdown_item}
          onClick={logoutHandeler}
        >
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout, getAuthUser })(
  UserInfoTopbar
);
