import React, { useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./PasswordSettings.module.scss";
import { connect } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { updatePasswordProfile } from "../../actions/Profile.action";
import { useNavigate } from "react-router-dom";

const PasswordSettings = ({ updatePasswordProfile }) => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isPasswordVisible3, setIsPasswordVisible3] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandeler = async (values) => {
    setLoading(true);
    let check = await updatePasswordProfile(
      values.oldpassword,
      values.password
    );
    if (check) {
      navigate("/settings");
      setLoading(false);
    }
    setLoading(false);
  };

  let initVals = {
    password: "",
    password2: "",
    oldpassword: "",
  };

  const SignupSchema = Yup.object().shape({
    oldpassword: Yup.string()
      .required("Old Password is required!")
      .min(6, "Old Password is too short!"),
    password: Yup.string()
      .required("New Password is required!")
      .min(6, "New Password is too short!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "New Passwords do not match!")
      .required("Retype New Password is required!"),
  });
  return (
    <div className={styles.wrapper}>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Header className="d-flex justify-content-center align-items-center">
          <span className={styles.heading}>Change Password</span>
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
                    <label htmlFor="oldpassword" className="d-block">
                      Old Password
                    </label>
                    {errors.oldpassword && touched.oldpassword ? (
                      <small className="text-danger">
                        {errors.oldpassword}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Create your own oldpassword"
                    name="oldpassword"
                    isValid={!errors.oldpassword && touched.oldpassword}
                    type={isPasswordVisible3 ? "text" : "password"}
                    className={`${styles.input} w-100 icon-hidden`}
                    isInvalid={errors.oldpassword && touched.oldpassword}
                    style={{ position: "relative" }}
                  />
                  {!isPasswordVisible3 ? (
                    <AiOutlineEye
                      className={styles.eyeIcon}
                      color="black"
                      onClick={() => setIsPasswordVisible3(!isPasswordVisible3)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className={styles.eyeIcon}
                      onClick={() => setIsPasswordVisible3(!isPasswordVisible3)}
                    />
                  )}
                </InputGroup>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password" className="d-block">
                      New Password
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
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password2" className="d-block">
                      Re-type New Password
                    </label>
                    {errors.password2 && touched.password2 ? (
                      <small className="text-danger">{errors.password2}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Re-type to confirm password"
                    name="password2"
                    isValid={!errors.password2 && touched.password2}
                    type={isPasswordVisible2 ? "text" : "password"}
                    className={`${styles.input} w-100 icon-hidden`}
                    isInvalid={errors.password2 && touched.password2}
                    style={{ position: "relative" }}
                  />
                  {!isPasswordVisible2 ? (
                    <AiOutlineEye
                      className={styles.eyeIcon}
                      onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className={styles.eyeIcon}
                      onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                    />
                  )}
                </InputGroup>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btn}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Change Password"}
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

export default connect(null, { updatePasswordProfile })(PasswordSettings);
