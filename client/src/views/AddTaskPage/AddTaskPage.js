import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./AddTaskPage.module.css";

const AddTaskPage = () => {
  const { id } = useParams();
  return (
    <div className={`bg-dark text-light`} style={{ minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <Breadcrumb className={styles.wrapper}>
        <Breadcrumb.Item>
          <Link to="/dashboard" className={styles.bc_home}>
            Projects
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/project/${id}`} className={styles.bc_home}>
            {id.substring(0, 6)}
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          Add Task
        </Breadcrumb.Item>
      </Breadcrumb>
      <AddTaskForm />
    </div>
  );
};

export default AddTaskPage;
