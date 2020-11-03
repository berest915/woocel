import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Continue.css";
import db from "../../config/firebase";

import { Avatar } from "@material-ui/core";
import Button from '@material-ui/core/Button'

import authContext from "../../context/auth/authContext";

const Continue = () => {
  const history = useHistory();
  const { user, rewriteUserInfo, resetAuth } = useContext(authContext);

  useEffect(() => {
    db.collection("users").onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        // compare and get the info from the right user
        const LST = localStorage.getItem("token");
        LST === doc.data().accessToken && rewriteUserInfo(doc.data());
      });
    });
  }, []);

  const signOut = () => {
    localStorage.removeItem('token')
    resetAuth()
    history.push('/')
  }

  return (
    <>
      <div className="continue">
        <div className="continue__container">
          <Avatar src={user && user.photoURL} />
          <p>You currently sign in as</p>
          <p>{user && user.email}</p>
          <Button className='google-btn' onClick={() => history.push('/app')}>Continue</Button>
          <Button className='google-btn' onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    </>
  );
};

export default Continue;
