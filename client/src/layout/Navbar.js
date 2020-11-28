import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

import Button from "@material-ui/core/Button";

import authContext from "../context/auth/authContext";
import db from "../config/firebase";

const Navbar = () => {
  const history = useHistory();
  const LST = localStorage.getItem("token");
  const { isLogin, writeUserInfo, resetAuth } = useContext(authContext);

  useEffect(() => {
    // read auth-userInfo from db => consistent login access
    // assume LST is not altered, either intentionally or accidentally
    if (LST) {
      db.collection("users").onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          // matched accessToken >> write into react-contexts
          let docData = doc.data();
          if (LST === docData.accessToken) {
            writeUserInfo({
              accessToken: docData.accessToken,
              displayName: docData.displayName,
              email: docData.email,
              photoURL: docData.photoURL,
            });
          }
          return doc;
        });
      });
    } else {
      signOut();
    }
    // eslint-disable-next-line
  }, [LST]);

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
        <div className="icons">
          <i className={`icon fas fa-bell-slash ${!isLogin && `active`}`}></i>
          <i className={`icon fas fa-wifi ${isLogin && `active`}`}></i>
        </div>
        <p className="text">{!isLogin ? "no-token" : "has-token"}</p>
        <Button
          // className={`google-btn ${!isLogin && "disabled"}`}
          className="google-btn"
          onClick={signOut}
          disabled={!isLogin && true}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
