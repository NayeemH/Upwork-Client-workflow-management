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
  index,
}) => {
  const navigate = useNavigate();

  const currentStepHandeler = () => {
    let current = 0;

    let tempProduct = selectedProject.productList.filter(
      (p) => p.steps.filter((s) => s._id === selectedStep._id).length > 0
    )[0];
    console.log(tempProduct);
    tempProduct.steps.map((item, i) => {
      if (item.finalImage !== null) {
        if (current <= i) {
          current = i + 1;
        }
      }
    });
    let finalIndex = 0;
    tempProduct.steps.map((item, i) => {
      if (item._id === selectedStep._id) {
        finalIndex = i;
      }
    });
    console.log("CUR" + current + " INDEX" + finalIndex);
    return current === finalIndex;
  };

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
              {selectedStep.finalImage === null && currentStepHandeler() && (
                <Button
                  onClick={() =>
                    approveStep(selectedStep._id, selectedStep.projectId)
                  }
                  className={styles.btn}
                >
                  Approve
                </Button>
              )}
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
