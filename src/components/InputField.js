import classes from "./InputField.module.css";

const InputField = ({titleID,titleType,titlePlaceHolder,setFunc})=>{

    return  <input className={classes["my-input"]}
    type={titleType}
    id={titleID}
    name={titleID}
    placeholder={titlePlaceHolder}
    required={true}
    onChange={(e) => {
        setFunc(e.target.value);
    }}
  />
};




export default InputField;