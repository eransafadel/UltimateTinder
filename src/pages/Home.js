import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import Button from "../components/UI/Button";
import Wrapper from "../components/UI/Wrapper";
import classes from "./Home.module.css";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const authToken = false;
  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    // <div className={classes.overlay}>
    <Wrapper>
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
        <div className={classes.home}>
      <h1 className={classes["primary-title"]}>Swipe Right®</h1>
      <Button onClick={handleClick} authToken={authToken}></Button>

      {showModal && (
        <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
      )}
       </div>
    </Wrapper>
    // </div>
  );
};

export default Home;
