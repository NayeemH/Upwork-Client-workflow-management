import React from "react";
import { MdOutlineClose, MdSpaceDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut, FiUserPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toogleSidebarVisibility } from "../../actions/Dashboard.action";
import styles from "./Sidebar.module.scss";
import { BsFillFolderFill } from "react-icons/bs";

const Sidebar = () => {
  let { sidebar_visible } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  return (
    <div className={`${styles.wrapper} ${sidebar_visible && styles.active}`}>
      <div className="text-end">
        <span
          className={styles.ham}
          onClick={() => dispatch(toogleSidebarVisibility(false))}
        >
          <MdOutlineClose />
        </span>
      </div>
      <div className="">
        <div className={styles.item}>
          <div className={styles.sidenavigation_links}>
            <div className={styles.link_base}>
              <div></div>
              <NavLink to="/dashboard">
                <span>
                  <MdSpaceDashboard />
                </span>
                Dashboard
              </NavLink>
            </div>
            <div className={styles.link_base}>
              <div></div>
              <h3>
                <span>
                  <AiFillHome />
                </span>
                Overview
              </h3>
            </div>
            <div className={styles.link_group}>
              <NavLink to="/dashboard">All Projects</NavLink>
              <NavLink to="/dashboard">Manager list</NavLink>
              <NavLink to="/dashboard">Client list</NavLink>
            </div>
            <div className={styles.link_base}>
              <div></div>
              <h3>
                <span>
                  <BsFillFolderFill />
                </span>
                Project
              </h3>
            </div>
            <div className={styles.link_group}>
              <NavLink to="/dashboard">Running Tasks</NavLink>
              <NavLink to="/dashboard">Compeleted Tasks</NavLink>
              <NavLink to="/admin/add-house">Downloads</NavLink>
            </div>

            <div className={styles.link_base}>
              <div></div>
              <NavLink to="/add-user">
                <span>
                  <FiUserPlus />
                </span>
                Add New User
              </NavLink>
            </div>
            <div className={styles.link_base}>
              <div></div>
              <NavLink to="/dashboard">
                <span>
                  <FiLogOut />
                </span>
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
