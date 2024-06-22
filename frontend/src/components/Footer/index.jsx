import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer(){
  return(
    <footer className="row py-4 mt-auto">
    <Col className="text-center">
    Copyright © Tecnutri. Created by <Link to="#">Camila Monteiro</Link>
    </Col>
  </footer>
  )
}
export default Footer;