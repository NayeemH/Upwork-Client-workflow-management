import React from "react";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = ({ project }) => {
  return (
    <div>
      PROJECT: {project.id}
      <br />
      Project Name : {project.name}
    </div>
  );
};

export default ProjectDetails;
