import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getStepDetails } from "../../actions/Project.action";
import styles from "./StepDetails.module.scss";

const StepDetails = ({ step, getStepDetails, loading }) => {
  const { stepId } = useParams();
  useEffect(() => {
    if (step === {} || !stepId || stepId !== step._id) {
      // LOAD STEP DATA
      getStepDetails(stepId);
    }
  }, [stepId]);
  return (
    <div className={styles.wrapper}>
      {(step === {} || step._id !== stepId) && loading === false ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 150px)", zIndex: 999 }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <h1>{step.name}</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  step: state.project.selected_step,
  loading: state.project.loading,
});

export default connect(mapStateToProps, { getStepDetails })(StepDetails);
