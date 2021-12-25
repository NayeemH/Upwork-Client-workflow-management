import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import styles from "./FilterDashboard.module.css";

const FilterDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("active");
  const [gridstyle, setGridstyle] = useState("grid");
  return (
    <>
      <div className={styles.wrapper}>
        <span className="fs-5">Projects</span>
        <div className="d-flex align-items-center">
          <span className="">Filter Projects</span>
          <ButtonGroup className="ms-3 me-3" aria-label="First group">
            {/* TODO::: FETCH PROJECT DATA DEPENDING ON THE SELECTED FILTER   */}
            <Button
              className={
                selectedFilter === "active" ? styles.active_btn : styles.btn
              }
              onClick={() => setSelectedFilter("active")}
            >
              Active
            </Button>
            <Button
              className={
                selectedFilter === "approved" ? styles.active_btn : styles.btn
              }
              onClick={() => setSelectedFilter("approved")}
            >
              Approved
            </Button>
          </ButtonGroup>
          <ButtonGroup className="" aria-label="First group">
            {/* TODO::: FETCH PROJECT DATA DEPENDING ON THE SELECTED FILTER   */}
            <Button
              className={gridstyle === "grid" ? styles.active_btn : styles.btn}
              onClick={() => setGridstyle("grid")}
            >
              <BsGridFill />
            </Button>
            <Button
              className={gridstyle === "list" ? styles.active_btn : styles.btn}
              onClick={() => setGridstyle("list")}
            >
              <FaThList />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className={styles.hr}></div>
    </>
  );
};

export default FilterDashboard;
