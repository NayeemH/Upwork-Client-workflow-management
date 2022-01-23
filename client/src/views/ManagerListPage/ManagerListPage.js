import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import ManagerList from "../../components/ManagerList/ManagerList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./ManagerListPage.module.css";

const ManagerListPage = () => {
  return (
    <div className={`bg-dark text-light`} style={{ minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <Breadcrumb className={styles.wrapper}>
        <Breadcrumb.Item>
          <Link to="/dashboard" className={styles.bc_home}>
            Dashboard
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          Manager List
        </Breadcrumb.Item>
      </Breadcrumb>
      <ManagerList />
    </div>
  );
};

export default ManagerListPage;
