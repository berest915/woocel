import { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Navbar.css";

import Button from "@material-ui/core/Button";

import authContext from "../context/auth/authContext";

const Navbar = () => {
  const history = useHistory()
  const { isLogin, accessToken, resetAuth } = useContext(authContext);

  const signOut = () => {
    localStorage.removeItem('token')
    resetAuth()
    history.push('/')
  }

  return (
    <div className="nav">
      <div className="nav__leftContainer">
        <p className="nav__titleText">Woocel</p>
      </div>
      <div className="nav__rightContainer">
        <i className={`fas fa-bell-slash ${!isLogin && `active`}`}></i>
        <i className={`fas fa-wifi ${isLogin && `active`}`}></i>

        <p className="token-status">
          {!accessToken ? 'no-token':'has-token'}
        </p>
        <Button className='google-btn' onClick={signOut}>Sign Out</Button>
      </div>
    </div>
  );
};

export default Navbar;
