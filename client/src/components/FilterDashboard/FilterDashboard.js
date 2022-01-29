import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button } from "react-bootstrap";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import styles from "./FilterDashboard.module.css";
import { toogleDashboardProjectStyle } from "../../actions/Dashboard.action";
import { useNavigate } from "react-router-dom";

const FilterDashboard = ({ selectedFilter }) => {
  const listStyleGrid = useSelector((state) => state.dashboard.projectListGrid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectToApprove = () => {
    navigate("/approved");
  };
  const redirectToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div className={styles.wrapper}>
        <span className="fs-5">Projects</span>
        <div className="d-flex align-items-center flex-column flex-md-row">
          <span className="">Filter Projects</span>
          <ButtonGroup className="ms-3 me-3" aria-label="First group">
            {/* TODO::: FETCH PROJECT DATA DEPENDING ON THE SELECTED FILTER   */}
            <Button
              className={
                selectedFilter === "active" ? styles.active_btn : styles.btn
              }
              onClick={() => redirectToDashboard()}
            >
              Active
            </Button>
            <Button
              className={
                selectedFilter === "approved" ? styles.active_btn : styles.btn
              }
              onClick={() => redirectToApprove()}
            >
              Approved
            </Button>
          </ButtonGroup>
          {selectedFilter !== "approved" && (
            <ButtonGroup className="my-3" aria-label="First group">
              {/* TODO::: FETCH PROJECT DATA DEPENDING ON THE SELECTED FILTER   */}
              <Button
                className={
                  listStyleGrid === "grid" ? styles.active_btn : styles.btn
                }
                onClick={() => dispatch(toogleDashboardProjectStyle("grid"))}
              >
                <BsGridFill />
              </Button>
              <Button
                className={`${
                  listStyleGrid === "list" ? styles.active_btn : styles.btn
                } ${styles.list__icon}`}
                onClick={() => dispatch(toogleDashboardProjectStyle("list"))}
              >
                <FaThList />
              </Button>
            </ButtonGroup>
          )}
        </div>
      </div>
      <div className={styles.hr}></div>
    </>
  );
};

export default FilterDashboard;
