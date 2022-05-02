import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button className={classes.primaryBtn} onClick={props.onClick}>
      {props.authToken ? "Signout" : "Create Account"}
      </button>
    </div>
  );
};

export default Button;
