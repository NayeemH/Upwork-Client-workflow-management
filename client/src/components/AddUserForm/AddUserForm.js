import React, { useEffect } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./AddUserForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, sendInvitation } from "../../actions/Project.action";

const AddUserForm = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);

  const onSubmitHandeler = async (values) => {
    dispatch(sendInvitation(values));
  };

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [fetchProjects]);

  let initVals = {
    email: "",
    role: "select",
    project: "select",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Provide valid email"
      )
      .required("Email is required!"),
    role: Yup.string()
      .test(
        "Is selected?",
        "Please select a role",
        (value) => value !== "select"
      )
      .required("Role is required!"),
    project: Yup.string()
      .test(
        "Is selected?",
        "Please select a Project",
        (value) => value !== "select"
      )
      .required("Project is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Invite New User</span>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initVals}
            validationSchema={SignupSchema}
            onSubmit={(values) => onSubmitHandeler(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="project" className="d-block">
                      Project Name
                    </label>
                    {errors.project && touched.project ? (
                      <small className="text-danger">{errors.project}</small>
                    ) : null}
                  </div>

                  <Field
                    as={BootstrapForm.Select}
                    placeholder="Select Project"
                    name="project"
                    className={` form-control w-100`}
                  >
                    <option value="select">Select Project</option>
                    {projects !== [] &&
                      projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                  </Field>
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="role" className="d-block">
                      Role of New User
                    </label>
                    {errors.role && touched.role ? (
                      <small className="text-danger">{errors.role}</small>
                    ) : null}
                  </div>

                  <Field
                    as={BootstrapForm.Select}
                    placeholder="Select Role"
                    name="role"
                    className={` form-control w-100`}
                  >
                    <option value="select">Select Role</option>

                    <option value="manager">Project Manager</option>
                    <option value="developer">Developer</option>
                    <option value="client">Client</option>
                  </Field>
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="email" className="d-block">
                      Email
                    </label>
                    {errors.email && touched.email ? (
                      <small className="text-danger pt-2">{errors.email}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type email address"
                    name="email"
                    isValid={!errors.email && touched.email}
                    type="email"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.email && touched.email}
                  />
                </InputGroup>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                  >
                    Send Invitation Link
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddUserForm;
