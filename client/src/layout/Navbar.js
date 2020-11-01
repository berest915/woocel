import { useContext } from "react";
import "./Navbar.css";

import authContext from "../context/auth/authContext";

const Navbar = () => {
  const { isLogin } = useContext(authContext);

  return (
    <div className="nav">
      <div className="nav__leftContainer">
        <p className="nav__titleText">Woocel</p>
      </div>
      <div className="nav__rightContainer">
        <i className={`fas fa-bell-slash ${!isLogin && `active`}`}></i>
        <i className={`fas fa-wifi ${isLogin && `active`}`}></i>

        <p className="token-status">no-token</p>
      </div>
    </div>
  );
};

export default Navbar;
