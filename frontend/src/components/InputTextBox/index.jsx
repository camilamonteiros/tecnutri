/* eslint-disable react/prop-types */
import styles from "./InputTextBox.module.css"

function InputTextBox({ idInput, placeholderInput, valueInput, onChangeInput, children }) {
  return (
    <div className={`${styles.formField} w-100 d-flex flex-column justify-content-start`}>
      <label className="pb-3" htmlFor={idInput}>{children}</label>
      <input 
        className={`${styles.inputBox} mb-3`} 
        type="text" 
        placeholder={placeholderInput} 
        name={idInput} 
        id={idInput} 
        value={valueInput} 
        onChange={onChangeInput} 
      />
    </div>
  )
}

export default InputTextBox
