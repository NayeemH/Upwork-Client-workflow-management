import React, { useEffect } from "react";
import Steps, { Step } from "rc-steps";
import { Button } from "react-bootstrap";
import styles from "./ProjectDetails.module.css";
import "rc-steps/assets/index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/URL";
import { AiOutlineCheck } from "react-icons/ai";

const ProjectDetails = ({ project }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  let width = window.innerWidth;
  const currentStepHandeler = (product) => {
    let current = 0;
    console.log(product.steps);
    product.steps.map((item, i) => {
      if (item.finalImage !== null) {
        if (current <= i) {
          current = i + 1;
        }
      }
    });

    return current;
  };
  return (
    <div className={styles.wrapper}>
      <div className="d-flex">
        <Button
          variant="primary"
          as={Link}
          to={`/project/add-task/${id}`}
          className={styles.button}
        >
          Add New Task
        </Button>
        <Button
          variant="primary"
          as={Link}
          to={`/project/add-task/${id}`}
          className={styles.button}
        >
          Download
        </Button>
      </div>
      <div className={styles.steps_wrapper}>
        {project.productList &&
          project.productList.map((task, index) => (
            <div className={styles.task} key={index}>
              <div className="p-3">
                <img
                  src={`${IMAGE_PATH}small/${task.image}`}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="d-flex flex-column  justify-content-center">
                <h4 className={styles.name}>{task.name}</h4>
                <Steps
                  labelPlacement="vertical"
                  current={currentStepHandeler(task)}
                  icons={{ finish: <AiOutlineCheck color="#fff" /> }}
                  direction={width > 768 ? "horizontal" : "vertical"}
                >
                  {task.steps &&
                    task.steps.map((step, i) => (
                      <Step
                        {...(step.viewed === false && { status: "error" })}
                        title={step.name}
                        key={i}
                        className={styles.stp}
                        onClick={() =>
                          navigate(`/project/${project._id}/step/${step._id}`)
                        }
                      />
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
