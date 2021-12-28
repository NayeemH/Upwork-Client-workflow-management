import React, { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProjectDetails } from "../../actions/Project.action";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./ProjectDetailsPage.module.css";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.selected_project);
  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, [dispatch, id]);
  return (
    <div className={`bg-dark text-light`}>
      <Topbar />
      <Breadcrumb className={styles.wrapper}>
        <Breadcrumb.Item>
          <Link to="/dashboard" className={styles.bc_home}>
            Projects
          </Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.bc_name} active>
          {project.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <ProjectDetails project={project} />
    </div>
  );
};

export default ProjectDetailsPage;
