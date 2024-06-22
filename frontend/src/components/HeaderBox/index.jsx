import styles from "./HeaderBox.module.css";
import { Container, Row } from "react-bootstrap";
import NavLinks from "./NavLinks";
import {
  BagCheck,
  BoxArrowInDownRight,
  BoxArrowUpRight,
  BoxSeam,
  People,
} from "react-bootstrap-icons";
import MainMenu from "./MainMenu";

function HeaderBox() {
  return (
    <Container fluid className={styles.headerBox}>
     <Container>
     <MainMenu />
      <Row className={styles.container}>
        <nav className={styles.navBar}>
          <NavLinks to="/product" icon={<BagCheck/>}>
            Produtos
          </NavLinks>
          <NavLinks to="/client" icon={<People />}>
            Clientes
          </NavLinks>
          <NavLinks to="#" icon={<BoxSeam />}>
            Estoque
          </NavLinks>
          <NavLinks to="#" icon={<BoxArrowInDownRight />}>
            Entradas
          </NavLinks>
          <NavLinks to="#" icon={<BoxArrowUpRight />}>
            Saídas
          </NavLinks>
        </nav>
      </Row>
     </Container>
    </Container>
  );
}
export default HeaderBox;
