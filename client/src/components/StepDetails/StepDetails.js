import React, { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getStepDetails } from "../../actions/Project.action";
import Overview from "./Overview/Overview";
import Preview from "./Preview/Preview";
import styles from "./StepDetails.module.scss";

const StepDetails = ({
  step,
  getStepDetails,
  loading,
  selectedCollectionIndex,
}) => {
  const { stepId, projectId } = useParams();

  useEffect(() => {
    getStepDetails(stepId);
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
        <Row>
          {selectedCollectionIndex >= 0 && (
            <Preview
              data={step.collections[selectedCollectionIndex]}
              length={step.collections.length}
              index={selectedCollectionIndex}
              collections={step.collections}
              projectId={projectId}
            />
          )}
          {selectedCollectionIndex >= 0 && (
            <Overview
              collection={step.collections[selectedCollectionIndex]}
              final={step.collections.length - 1 === selectedCollectionIndex}
              index={selectedCollectionIndex}
            />
          )}
          {step.collections.length === 0 && <Overview />}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  step: state.project.selected_step,
  selectedCollectionIndex: state.project.selected_collection,
  loading: state.project.loading,
});

export default connect(mapStateToProps, { getStepDetails })(StepDetails);
