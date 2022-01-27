import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
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
  feedbackActive,
  setFeedbackActive,
  showForm,
  setShowForm,
  points,
  setPoints,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const currentStepHandeler = () => {
    let current = 0;

    let tempProduct = selectedProject.productList.filter(
      (p) => p.steps.filter((s) => s._id === selectedStep._id).length > 0
    )[0];

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

    return current === finalIndex;
  };

  const handleClick = () => {
    navigate(`/project/${selectedProject._id}/step/${selectedStep._id}/upload`);
  };

  const handleClickFeedback = () => {
    setFeedbackActive(true);
  };

  const formSubmitHandeler = (e) => {
    e.preventDefault();
    console.log("X = ", points.x, "Y = ", points.y, "id", points.stepId);
    setShowForm(false);
    setFeedbackActive(false);
    setMessage("");
    setPoints(null);
  };

  const cancelHandeler = () => {
    setMessage("");
    setPoints(null);
    setShowForm(false);
    setFeedbackActive(false);
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
            <>
              <div className="d-flex justify-content-between align-items-center">
                {selectedStep.finalImage === null && currentStepHandeler() && (
                  <>
                    <Button
                      onClick={() =>
                        approveStep(selectedStep._id, selectedStep.projectId)
                      }
                      className={styles.btn}
                    >
                      Approve
                    </Button>
                    {feedbackActive ? (
                      <span className="fw-bold">
                        Click on the image to add feedback
                      </span>
                    ) : (
                      <Button
                        onClick={handleClickFeedback}
                        className={styles.btn_feedback}
                      >
                        Feedback
                      </Button>
                    )}
                  </>
                )}
              </div>
              {points !== null &&
                collection._id === points.stepId &&
                showForm === true && (
                  <div className={styles.form}>
                    <Form onSubmit={(e) => formSubmitHandeler(e)}>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows="3"
                          placeholder="Add your feedback"
                          className={styles.textarea}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="pt-2">
                          <Button type="submit" className={styles.btn}>
                            Submit
                          </Button>
                          <Button
                            type="reset"
                            onClick={cancelHandeler}
                            className={styles.btn_feedback}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                )}
            </>
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
