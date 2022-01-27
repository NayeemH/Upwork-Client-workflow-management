import React, { useRef, useState } from "react";
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
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";

const Preview = ({
  data,
  length,
  index,
  collections,
  projectId,
  feedbackActive,
  setFeedbackActive,
  showForm,
  setShowForm,
  points,
  setPoints,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const imgRef = useRef(null);

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

  const imgClickHandeler = (e) => {
    if (feedbackActive && !showForm) {
      const { clientX, clientY } = e;
      const { width, height, left, right, top, bottom } =
        imgRef.current.getBoundingClientRect();
      let cursorX = clientX - left;
      let cursorY = clientY - top;

      let x = (cursorX / width) * 100;
      let y = (cursorY / height) * 100;

      setPoints({ x, y, stepId: data._id });

      setShowForm(true);
    }
  };

  return (
    <Col md={9}>
      <div className="d-flex  align-items-center  pb-3">
        <span className={styles.back_icon}>
          <AiOutlineLeft
            size={20}
            onClick={() => navigate(`/project/${projectId}`)}
          />
        </span>
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
      <div className={styles.img_wrapper} ref={imgRef}>
        <img
          src={`${IMAGE_PATH}original/${data.image}`}
          alt=""
          onClick={(e) => imgClickHandeler(e)}
          className={styles.img}
        />

        {points !== null && data._id === points.stepId && (
          <div
            className={styles.point}
            style={{ left: `${points.x - 1}%`, top: `${points.y - 1}%` }}
          >
            <BiHelpCircle />
          </div>
        )}

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
                  <span className="d-block">{item.title}</span>
                  <span className={styles.date}>
                    <Moment format="DD-MM-YYYY">{item.createAt}</Moment>
                  </span>
                </div>
              ))}
            </div>
          )}
          <span className={styles.icon}>
            <MdHistory onClick={historyHandeler} size={20} />
          </span>
          <span className={styles.date}>
            <Moment format="DD-MM-YYYY">{data.createAt}</Moment>
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
