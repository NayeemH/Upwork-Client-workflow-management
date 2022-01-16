import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import styles from "./ListItem.module.css";

const ListItem = ({ item }) => {
  return (
    <Card text="light" bg="dark" className={styles.crd}>
      <Card.Body className={styles.body}>
        <Row>
          <div className={styles.img_wrapper}>
            <img src={item.image} className={styles.img} alt={item.name} />
          </div>
          <Col className="d-flex justify-content-between flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <h3>{item.name}</h3>
              <span className={`${styles.star} d-md-block d-none`}>
                {item.stared ? <BsStarFill /> : <BsStar />}
              </span>
            </div>
            <p>{item.description}</p>

            <div className="d-flex justify-content-between align-items-center mt-auto ">
              <span className={styles.down}>
                <MdDownload /> Download
              </span>
              {item.notification > 0 && (
                <span className={styles.notification}>{item.notification}</span>
              )}
              <div className="d-flex justify-content-between align-items-center">
                <span className={styles.id}>ID: {item.id}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
