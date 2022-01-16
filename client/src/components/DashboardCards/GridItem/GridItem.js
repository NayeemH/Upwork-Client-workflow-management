import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import styles from "./GridItem.module.css";
import { IMAGE_PATH } from "../../../constants/URL";
import { useDispatch } from "react-redux";
import {
  addFavoriteProject,
  removeFavoriteProject,
} from "../../../actions/Project.action";

const GridItem = ({ item, star = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Col>
      <Card bg="dark" text="light" className={styles.crd}>
        <Card.Img variant="top" src={`${IMAGE_PATH}small/${item.image}`} />
        <Card.Body>
          <Card.Title
            onClick={() => navigate(`/project/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </Card.Title>
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
            <span className={styles.id}>ID: {item.id.substring(0, 6)}</span>
            <span className={styles.star}>
              {star ? (
                <BsStarFill
                  onClick={() => dispatch(removeFavoriteProject(item.id))}
                />
              ) : (
                <BsStar onClick={() => dispatch(addFavoriteProject(item.id))} />
              )}
            </span>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default GridItem;
