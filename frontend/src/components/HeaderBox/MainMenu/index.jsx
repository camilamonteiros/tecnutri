import { Col, Container, Row } from "react-bootstrap";
import styles from "./MainMenu.module.css";
import { Link } from "react-router-dom";
import logoPrincipal from "../../../../public/images/logo/tec5.svg"

function MainMenu() {
  return (
    <Container className={styles.container}>
      <Row className="d-flex justify-conetent-center">
        <Col xs={4} className={`${styles.menuEsquerda} ${styles.menu}`}>
        <Link to={"/"}>Dashboard</Link>
        </Col>
        <Col xs={4} className={`${styles.menuLogo} ${styles.menu}`}>
        <Link to="/">
          <img
            className={styles.logoPrincipal}
            src={logoPrincipal}
            alt="logo"
          />
        </Link>
        </Col>
        <Col xs={4} className={`${styles.menuLogo} ${styles.menu}`}>
        <Link to="/">LogOut</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default MainMenu;
