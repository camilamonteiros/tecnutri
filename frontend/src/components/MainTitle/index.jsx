/* eslint-disable react/prop-types */

import styles from "./MainTitle.module.css"

function MainTitle({children}){
  return(
    <h1 className={styles.mainTitle}>{children}</h1>
  )
}
export default MainTitle;