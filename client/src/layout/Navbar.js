import { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Navbar.css";

import Button from "@material-ui/core/Button";

import authContext from "../context/auth/authContext";

const Navbar = () => {
  const history = useHistory();
  const { isLogin, accessToken, resetAuth } = useContext(authContext);

  const signOut = () => {
    localStorage.removeItem("token");
    resetAuth();
    history.push("/");
  };

  return (
    <div className="nav">
      <div className="nav__leftContainer">
      <i className="fab fa-whatsapp logo"></i>
        <p className="title">Woocel</p>
      </div>
      <div className="nav__rightContainer">
        <div className='icons'>

        <i className={`icon fas fa-bell-slash ${!isLogin && `active`}`}></i>
        <i className={`icon fas fa-wifi ${isLogin && `active`}`}></i>
        </div>
        <p className="text">
          {!accessToken ? "no-token" : "has-token"}
        </p>
        <Button
          className={`google-btn ${!accessToken && "disabled"}`}
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
