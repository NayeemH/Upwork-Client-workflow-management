import Steps, { Step } from "rc-steps";
import React from "react";
import styles from "./ProjectDetails.module.css";
import "rc-steps/assets/index.css";
import { Button } from "react-bootstrap";

const ProjectDetails = ({ project }) => {
  return (
    <div className={styles.wrapper}>
      PROJECT: {project.id}
      <br />
      Project Name : {project.name}
      <div className={styles.steps_wrapper}>
        {project.tasks &&
          project.tasks.map((task, index) => (
            <div className={styles.task} key={index}>
              <div className="p-3">
                <img src={task.image} className="img-fluid" alt="" />
              </div>
              <div className="d-flex flex-column  justify-content-center">
                <h4 className={styles.name}>{task.name}</h4>
                <Steps labelPlacement="vertical" current={task.currentStep - 1}>
                  {task.steps &&
                    task.steps.map((step, i) => (
                      <Step title={step.name} key={i} />
                    ))}
                </Steps>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant="outline-primary"
                  disabled={!task.compeleted}
                  className={styles.btn}
                >
                  Download Resource
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
