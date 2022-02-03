import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addFavoriteProject,
  removeFavoriteProject,
} from "../../../actions/Project.action";
import styles from "./ListItem.module.css";

const ListItem = ({ item, star = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card text="light" bg="dark" className={styles.crd}>
      <Card.Body className={styles.body}>
        <Row>
          <Col className="d-flex justify-content-between flex-row">
            <div className="d-flex align-items-center">
              <span className={styles.id}>
                Project Id: {item.id.substring(0, 6)}
              </span>
              <span className={`${styles.star} pb-2 d-md-block d-none`}>
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
              <span
                className="px-5 d-block "
                onClick={() => navigate(`/project/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center ">
              {item.productNumber > 0 && (
                <span className={styles.notification}>
                  {item.productNumber}
                </span>
              )}
              <span className={styles.down}>
                <MdDownload /> Download
              </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
