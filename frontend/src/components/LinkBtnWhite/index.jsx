/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./LinkBtnWhite.module.css"

function LinkBtnWhite({children, linkTo}){
  return(
    <Link to={linkTo}>
      <button className={`${styles.linkBtn} mx-2`}>{children}</button>
    </Link>
  )
}
export default LinkBtnWhite;