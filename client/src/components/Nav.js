import whiteLogo from "../images/tinder-logo-white1.png";
import colorLogo from "../images/color-logo-tinder1.png";
import classes from "./Nav.module.css";
const Nav = ({ authToken,minimal, setShowModal, showModal,setIsSignUp }) => {

    

    const handleClick =()=>{
        setShowModal(true);
        setIsSignUp(false);
    }

  return (
    <nav className={classes.nav}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={minimal ? colorLogo : whiteLogo} />
      </div>
      {!authToken && !minimal && (
        <button
          className={classes["nav-button"]}
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
