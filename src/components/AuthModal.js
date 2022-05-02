import classes from "./AuthModal.module.css";
import { useState } from "react";
import Form from "./Form";
import InputField from "./InputField";
const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState("");

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match!");
      }
      console.log("make a post request to our database");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["auth-modal"]}>
      <div className={classes["close-icon"]} onClick={handleClick}>
        ⓧ
      </div>
      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>By clicking Log in,you agree to out teams.</p>
      <p>
        Learn how we procces your data in our Privacy Policy and Cookie Policy.
      </p>
      <Form handleSubmitHandler={handleSubmit}>
        <InputField
          titleID="email"
          titleType="email"
          titlePlaceHolder="email"
          setFunc={setEmail}
        />
        <InputField
          titleID="password"
          titleType="password"
          titlePlaceHolder="password"
          setFunc={setPassword}
        />
        {isSignUp && (
          <InputField
            titleID="password-check"
            titleType="password-check"
            titlePlaceHolder="confirm password"
            setFunc={setConfirmPassword}
          />
        )}
      </Form>
      AUTH MODAL
      <hr />
      <h2>GET THE APP </h2>
      <p>{error + "$$"}</p>
    </div>
  );
};

export default AuthModal;
