import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [state, setState] = useState("");

  return (
    <div className="nav">
      <div className="nav__leftContainer">
        {/* <i className="nav__titleIcon fab fa-whatsapp"></i> */}
        <p className="nav__titleText">Woocel</p>
      </div>
      <div className="nav__rightContainer">
       
          <i className="fas fa-bell-slash"></i>
          <i className="fas fa-wifi"></i>
      
        <p className="token-status">no-token</p>
      </div>
    </div>
  );
};

export default Navbar;
