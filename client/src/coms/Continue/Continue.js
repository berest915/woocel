// react hooks + css
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Continue.css";
// @material-ui
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// firebase
import db from "../../config/firebase";
// react contexts
import authContext from "../../context/auth/authContext";

const Continue = () => {
  const history = useHistory();

  const { user, writeUserInfo, resetAuth } = useContext(authContext);
  useEffect(() => {
    db.collection("users").onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        // test if LST match with any of logined-user
        const LST = localStorage.getItem("token");
        // rewrite logined-user info into contexts
   
        if(LST === doc.data().accessToken) {
          writeUserInfo(doc.data());
          // debugger
          // console.log(LST)
          // console.log('split')
          // console.log(doc.data().accessToken)
        }else{
        }
        return doc;
      });
    });
  }, [writeUserInfo]);

  const signOut = () => {
    localStorage.removeItem("token");
    resetAuth();
    history.push("/");
  };

  return (
    <>
      <div className="continue__container">
        <Avatar className="avatar" src={user && user.photoURL} />
        <p className="name">{user && user.displayName}</p>
        <p className="email">{user && user.email}</p>
        <div className="buttons">
          <Button className="google-btn" onClick={() => history.push("/app")}>
            Continue
          </Button>
          <Button className="google-btn" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Continue;
