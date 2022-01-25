import React, { useState } from "react";
import { Col } from "react-bootstrap";
import styles from "./Preview.module.scss";
import { IMAGE_PATH } from "../../../constants/URL";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  selectedCollectionChange,
  selectIndex,
} from "../../../actions/Project.action";
import { IoMdDownload } from "react-icons/io";
import { saveAs } from "file-saver";

const Preview = ({ data, length, index, collections }) => {
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);
  const downloadImage = () => {
    saveAs(
      `${IMAGE_PATH}original/${data.image}`,
      `${data.title} ${data.image}`
    );
  };

  const historyHandeler = () => {
    setShowHistory(!showHistory);
  };

  const selectFunc = (i) => {
    dispatch(selectIndex(i));
    setShowHistory(false);
  };
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
      <div className={styles.img_wrapper}>
        <img
          src={`${IMAGE_PATH}original/${data.image}`}
          alt=""
          className={styles.img}
        />
        <div
          className={`d-flex justify-content-between align-items-center pt-2 ${styles.history_wrapper}`}
        >
          {showHistory && (
            <div className={styles.list}>
              {collections.map((item, i) => (
                <div
                  key={item._id}
                  className={`py-1 ${styles.item}`}
                  onClick={() => selectFunc(i)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
          <span className={styles.icon}>
            <MdHistory onClick={historyHandeler} size={20} />
          </span>
          <span className={styles.icon}>
            <IoMdDownload onClick={downloadImage} size={20} />
          </span>
        </div>
      </div>
    </Col>
  );
};

export default Preview;
