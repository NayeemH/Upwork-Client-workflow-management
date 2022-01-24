import React from "react";
import { Col } from "react-bootstrap";
import styles from "./Overview.module.scss";

const Overview = ({ collection }) => {
  return (
    <Col md={3} className={styles.wrapper}>
      <h5>{collection.title}</h5>
      <p className={styles.desc}>{collection.description}</p>
    </Col>
  );
};

export default Overview;
