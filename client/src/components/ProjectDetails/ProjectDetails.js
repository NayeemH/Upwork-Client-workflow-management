import React from "react";
import Steps, { Step } from "rc-steps";
import { BiPlus } from "react-icons/bi";
import { Button } from "react-bootstrap";
import styles from "./ProjectDetails.module.css";
import "rc-steps/assets/index.css";
import { Link, useParams } from "react-router-dom";

const ProjectDetails = ({ project }) => {
  const { id } = useParams();
  return (
    <div className={styles.wrapper}>
      <Button
        variant="primary"
        as={Link}
        to={`/project/${id}/add-task`}
        className={styles.button}
      >
        Add New Task
      </Button>
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
