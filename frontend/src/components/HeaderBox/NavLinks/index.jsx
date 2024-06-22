import { Link } from "react-router-dom";
import styles from "./NavLinks.module.css";
// eslint-disable-next-line react/prop-types
function NavLinks({ to, icon, children }) {
  return (
    <Link to={to} className={styles.navLink}>
      {icon} <span className="px-2">{children}</span>
    </Link>
  );
}
export default NavLinks;
