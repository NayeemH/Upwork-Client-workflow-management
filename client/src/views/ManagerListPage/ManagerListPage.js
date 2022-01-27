import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getManagerList } from "../../actions/Dashboard.action";
import ClientList from "../../components/ClientList/ClientList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./ManagerListPage.module.css";

const ManagerListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManagerList());
  }, []);
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
      <ClientList />
    </div>
  );
};

export default ManagerListPage;
