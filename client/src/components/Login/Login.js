import { Field, Form, Formik } from "formik";
import React from "react";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AnimatedBG from "../shared/AnimatedBG/AnimatedBG";
import styles from "./Login.module.css";
import logoImg from "../../assets/Logo.png";

const Login = () => {
  const onSubmitHandeler = async (values) => {
    console.log(values);
  };

  let initVals = {
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password is too short!"),
  });
  return (
    <>
      <AnimatedBG />
      <div className={styles.wrapper}>
        <Card bg="dark" text="light" className={styles.crd}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span className={styles.heading}>Login</span>
            <img src={logoImg} className={styles.logo} alt="" />
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
                      <label htmlFor="email" className="d-block">
                        Email
                      </label>
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Provide your email address"
                      name="email"
                      isValid={!errors.email && touched.email}
                      type="email"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.email && touched.email}
                    />
                    {errors.email && touched.email ? (
                      <small className="text-danger pt-2">{errors.email}</small>
                    ) : null}
                  </InputGroup>

                  <InputGroup className=" d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <label htmlFor="password" className="">
                        Password
                      </label>
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
                    {errors.password && touched.password ? (
                      <small className="text-danger pt-2">
                        {errors.password}
                      </small>
                    ) : null}
                  </InputGroup>
                  <div className="text-end">
                    <Link to="/forget-password" className={styles.link}>
                      Forget Password?
                    </Link>
                  </div>

                  <div className="pt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className={styles.btn}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
