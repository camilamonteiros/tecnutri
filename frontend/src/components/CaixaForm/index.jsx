/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap";
import styles from "./CaixaForm.module.css";

function Formulario({children, onSubmit}) {
  return (
    <form method="post" onSubmit={onSubmit} className="d-flex align-items-center justify-content-center flex-column">
      <Col
      xs={12}
      md={6}
      className={`${styles.formBox} d-flex align-items-center justify-content-center flex-column`}
    >
     {children}
    </Col>
    </form>
  );
}
export default Formulario;
