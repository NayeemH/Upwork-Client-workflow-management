import React from "react";
import { Card, Col } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import styles from "./GridItem.module.css";

const GridItem = ({ item }) => {
  return (
    <Col>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          <span className={styles.down}>
            <MdDownload /> Download
          </span>
          {item.notification > 0 && (
            <span className={styles.notification}>{item.notification}</span>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <span className={styles.id}>ID: {item.id}</span>
            <span className={styles.star}>
              {item.stared ? <BsStarFill /> : <BsStar />}
            </span>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default GridItem;
