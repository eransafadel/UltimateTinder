import classes from "./Form.module.css";
const Form = (props) => {
 


  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmitHandler();
   
  };

  return (
    <form className={classes["my-form"]} onSubmit={handleSubmit}>
      {props.children}
      <input className={classes["secondary-button"]} type="submit" />
   
    </form>
  );
};

export default Form;
