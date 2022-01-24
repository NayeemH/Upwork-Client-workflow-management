import React from "react";
import { Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Overview.module.scss";

const Overview = ({ collection }) => {
  const navigate = useNavigate();
  const selectedStep = useSelector((state) => state.project.selected_step);
  const selectedProject = useSelector(
    (state) => state.project.selected_project
  );

  const handleClick = () => {
    navigate(`/project/${selectedProject._id}/step/${selectedStep._id}/upload`);
  };
  return (
    <Col md={3} className={styles.wrapper}>
      <Button onClick={handleClick} className={styles.btn}>
        Upload Task Image
      </Button>
      <h5>{collection.title}</h5>
      <p className={styles.desc}>{collection.description}</p>
    </Col>
  );
};

export default Overview;
