import React from "react";
import { useSelector } from "react-redux";
import { Row, Container, Col } from "react-bootstrap";
import styles from "./DashboardCards.module.css";
import data from "../../stub/projects/dashboardProjectList.js";
import GridItem from "./GridItem/GridItem";
import ListItem from "./ListItem/ListItem";

const DashboardCards = () => {
  const listGrid = useSelector((state) => state.dashboard.projectListGrid);
  return (
    <Container fluid className={styles.wrapper}>
      {data.filter((item) => item.stared).length > 0 && (
        <>
          {data.filter((item) => item.stared).length > 0 && (
            <Row className="pt-3 text-light text-center">
              <Col xs={12}>
                <span className={styles.border_bottom}>Favorites</span>
              </Col>
            </Row>
          )}
          {listGrid === "grid" ? (
            <>
              <Row xs={1} md={4} lg={5} className="g-4 py-4 mx-0">
                {data
                  .filter((item) => item.stared)
                  .map((item) => (
                    <GridItem item={item} key={item.id} />
                  ))}
              </Row>
            </>
          ) : (
            data
              .filter((item) => item.stared)
              .map((item) => <ListItem key={item.id} item={item} />)
          )}
          <hr className={styles.hr} />
        </>
      )}
      {listGrid === "grid" ? (
        <Row xs={1} md={4} lg={5} className="g-4 py-4 mx-0">
          {data
            .filter((item) => !item.stared)
            .map((item) => (
              <GridItem item={item} key={item.id} />
            ))}
        </Row>
      ) : (
        data
          .filter((item) => !item.stared)
          .map((item) => <ListItem key={item.id} item={item} />)
      )}
    </Container>
  );
};

export default DashboardCards;
