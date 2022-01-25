import React from "react";
import { Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { approveStep } from "../../../actions/Project.action";
import styles from "./Overview.module.scss";

const Overview = ({
  collection,
  selectedStep,
  selectedProject,
  approveStep,
  final,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${selectedProject._id}/step/${selectedStep._id}/upload`);
  };
  return (
    <Col md={3} className={styles.wrapper}>
      <Button onClick={handleClick} className={styles.btn}>
        Upload Task Image
      </Button>
      {collection && (
        <>
          <h5>{collection.title}</h5>
          <p className={styles.desc}>{collection.description}</p>
          {final && (
            <div className="d-flex justify-content-between align-items-center">
              <Button
                onClick={() => approveStep(selectedStep._id)}
                className={styles.btn}
              >
                Approve
              </Button>
              <Button onClick={handleClick} className={styles.btn_feedback}>
                Feedback
              </Button>
            </div>
          )}
        </>
      )}
    </Col>
  );
};
const mapStateToProps = (state) => ({
  selectedStep: state.project.selected_step,
  selectedProject: state.project.selected_project,
});

export default connect(mapStateToProps, { approveStep })(Overview);
