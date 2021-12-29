import { Field, Formik, Form } from "formik";
import React from "react";
import {
  Button,
  InputGroup,
  Form as BootstrapForm,
  Card,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./NewAccountForm.module.css";

const NewAccountForm = () => {
  const onSubmitHandeler = async (values) => {
    console.log(values);
  };

  let initVals = {
    username: "",
    password: "",
    password2: "",
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password is too short!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match!")
      .required("Retype Password is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Create Account</span>
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
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="username" className="d-block">
                      Username
                    </label>
                    {errors.username && touched.username ? (
                      <small className="text-danger pt-2">
                        {errors.username}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Type your username"
                    name="username"
                    isValid={!errors.username && touched.username}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.username && touched.username}
                  />
                </InputGroup>

                <InputGroup className=" d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="password" className="">
                      Password
                    </label>
                    {errors.password && touched.password ? (
                      <small className="text-danger pt-2">
                        {errors.password}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Create your own password"
                    name="password"
                    isValid={!errors.password && touched.password}
                    type="password"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.password && touched.password}
                  />
                </InputGroup>
                <InputGroup className=" d-flex flex-column py-3">
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <label htmlFor="password2" className="">
                      Retype Password
                    </label>
                    {errors.password2 && touched.password2 ? (
                      <small className="text-danger pt-2">
                        {errors.password2}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Retype your password"
                    name="password2"
                    isValid={!errors.password2 && touched.password2}
                    type="password"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.password2 && touched.password2}
                  />
                </InputGroup>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                  >
                    Create Account
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

export default NewAccountForm;
