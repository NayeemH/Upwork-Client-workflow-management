import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AnimatedBG from "../shared/AnimatedBG/AnimatedBG";
import styles from "./Login.module.css";
import logoImg from "../../assets/Logo.png";
import { login } from "../../actions/Dashboard.action";
import { connect, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const queryString = require("query-string");

const Login = ({ login, loading }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check = await login(values);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  let initVals = {
    email: parsed.email,
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

                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password" className="d-block">
                        Password
                      </label>
                      {errors.password && touched.password ? (
                        <small className="text-danger">{errors.password}</small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Create your own password"
                      name="password"
                      isValid={!errors.password && touched.password}
                      type={isPasswordVisible ? "text" : "password"}
                      className={`${styles.input} w-100 icon-hidden`}
                      isInvalid={errors.password && touched.password}
                      style={{ position: "relative" }}
                    />
                    {!isPasswordVisible ? (
                      <AiOutlineEye
                        className={styles.eyeIcon}
                        color="black"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className={styles.eyeIcon}
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    )}
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
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Login"}
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

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
