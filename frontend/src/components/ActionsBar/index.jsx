/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import styles from "./ActionsBar.module.css";
import MainTitle from "../MainTitle";

function ActionsBar({titulo, children}) {
  return (
    <Row className={`${styles.bar}`}>
      <Col xs={12} md={4}>
        <MainTitle>{titulo}</MainTitle>
      </Col>
      <Col xs={12} md={8}>
      <div className="d-flex justify-content-end">
      {children}
      </div>
      </Col>
    </Row>
  );
}
export default ActionsBar;
