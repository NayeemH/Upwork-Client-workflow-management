import React from "react";
import { Col } from "react-bootstrap";
import styles from "./Preview.module.scss";
import { IMAGE_PATH } from "../../../constants/URL";

const Preview = ({ preview }) => {
  return (
    <Col md={9}>
      <img
        src={`${IMAGE_PATH}original/${preview}`}
        alt=""
        className={styles.img}
      />
    </Col>
  );
};

export default Preview;
