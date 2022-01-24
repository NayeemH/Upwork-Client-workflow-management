import React from "react";
import { Col } from "react-bootstrap";
import styles from "./Preview.module.scss";
import { IMAGE_PATH } from "../../../constants/URL";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { selectedCollectionChange } from "../../../actions/Project.action";

const Preview = ({ data, length, index }) => {
  const dispatch = useDispatch();
  return (
    <Col md={9}>
      <div className="d-flex  align-items-center  pb-3">
        <AiOutlineLeft size={20} />
        <div className="d-flex justify-content-center align-items-center w-100">
          <span className={styles.nav}>
            <AiOutlineLeft
              size={20}
              onClick={() =>
                index > 0 && dispatch(selectedCollectionChange(false))
              }
              style={index === 0 && { color: "#ccc", cursor: "auto" }}
            />
          </span>
          <span>{data.title}</span>
          <span className={styles.nav_right}>
            <AiOutlineRight
              size={20}
              onClick={() =>
                index !== length - 1 && dispatch(selectedCollectionChange(true))
              }
              style={index === length - 1 && { color: "#ccc", cursor: "auto" }}
            />
          </span>
        </div>
      </div>
      <div className="">
        <img
          src={`${IMAGE_PATH}original/${data.image}`}
          alt=""
          className={styles.img}
        />
      </div>
    </Col>
  );
};

export default Preview;
