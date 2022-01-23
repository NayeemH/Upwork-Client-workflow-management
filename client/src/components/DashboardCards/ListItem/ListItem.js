import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addFavoriteProject,
  removeFavoriteProject,
} from "../../../actions/Project.action";
import { IMAGE_PATH } from "../../../constants/URL";
import styles from "./ListItem.module.css";

const ListItem = ({ item, star = false }) => {
  const dispatch = useDispatch();
  return (
    <Card text="light" bg="dark" className={styles.crd}>
      <Card.Body className={styles.body}>
        <Row>
          <div className={styles.img_wrapper}>
            <img
              src={`${IMAGE_PATH}small/${item.image}`}
              className={styles.img}
              alt={item.name}
            />
          </div>
          <Col className="d-flex justify-content-between flex-column">
            <div className="d-flex justify-content-between align-items-center">
              <h3>{item.name}</h3>
              <span className={`${styles.star} d-md-block d-none`}>
                {star ? (
                  <BsStarFill
                    onClick={() => dispatch(removeFavoriteProject(item.id))}
                  />
                ) : (
                  <BsStar
                    onClick={() => dispatch(addFavoriteProject(item.id))}
                  />
                )}
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
                <span className={styles.id}>ID: {item.id.substring(0, 6)}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
