import { Col, Container, Row } from "react-bootstrap";
import styles from "./BasePage.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderBox from "../../components/HeaderBox";
function BasePage() {
  return (
    <Container fluid className="gx-0">
      <HeaderBox/>
     <Container>
     <Row>
       
       <Col className={`d-flex flex-column ${styles.mainContainer}`}>
         <Outlet />
         <Footer />
       </Col>
     </Row>
     </Container>
    </Container>
  );
}
export default BasePage;
