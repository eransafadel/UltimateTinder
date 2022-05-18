import classes from "./AuthModal.module.css";
import { useState } from "react";
import Form from "./Form";
import InputField from "./InputField";
import axios from 'axios';
import {useCookies} from 'react-cookie';

import {useNavigate} from 'react-router-dom';
const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState("");
  const [cookies,setCookie,removeCookies] = useCookies(['user']);
  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async() => {
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match!");
        return;
      }

     const response = await axios.post(`http://localhost:8000/${isSignUp?'signup':'login'}`,{email,password});

     
     setCookie('UserId',response.data.userId);
     setCookie('AuthToken',response.data.token);

     console.log('cookie',cookies);
 
     const success = response.status=== 201;
     if(success&& isSignUp) {
       navigate('/onboarding');
     }

     if(success&& !isSignUp)  
     {
      navigate('/dashboard');
     } 

     window.location.reload();

      



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
