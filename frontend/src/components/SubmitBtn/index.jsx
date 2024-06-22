/* eslint-disable react/prop-types */
import styles from "./SubmitBtn.module.css"

function SubmitBtn({children}){
  return(
<div className={`${styles.submitBtn}`}>
      <button type="submit">{children}</button>
      </div>
  )
}
export default SubmitBtn;