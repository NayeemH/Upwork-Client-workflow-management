import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, Button } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import StepDetails from "../../components/StepDetails/StepDetails";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./StepDetailsPage.module.css";
import { Link, useNavigate } from "react-router-dom";

const StepDetailsPage = () => {
  const selectedStep = useSelector((state) => state.project.selected_step);
  const selectedProject = useSelector(
    (state) => state.project.selected_project
  );
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${selectedProject._id}/step/${selectedStep._id}/upload`);
  };
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
        <Breadcrumb.Item>
          <Link
            to={`/project/${selectedProject._id}`}
            className={styles.bc_home}
          >
            {selectedProject.name}
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          {selectedStep.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="text-end pr-5">
        <Button onClick={handleClick} className={styles.btn}>
          Upload Task Image
        </Button>
      </div>

      <StepDetails />
    </div>
  );
};

export default StepDetailsPage;
