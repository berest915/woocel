import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

import Button from "@material-ui/core/Button";

import { auth, provider } from "../../config/firebase";
import db from "../../config/firebase";
import authContext from "../../context/auth/authContext";

const Login = () => {
  const history = useHistory();
  const LST = localStorage.getItem("token");
  const { user, setUser, setAccessToken, accessToken } = useContext(
    authContext
  );
  const [DBT, setDBT] = useState(null);

  const signIn = async () => {
     await auth
      .signInWithPopup(provider)
      .then(result => {
        setUser(result);
        setAccessToken(result.credential.accessToken);
        localStorage.setItem("token", result.credential.accessToken);
        // write into db
        // ################################################### //
        db.collection("users")
          .doc(result.user.email)
          .set({
            accessToken: result.credential.accessToken,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
        // ################################################### //
      })
      .catch(error => alert(error.message));
    history.push('/app')
  };

  useEffect(() => {
    
    LST && history.push('/continue')
    // if (LST) {
    //   db.collection("users").onSnapshot(snapshot => {
    //     snapshot.docs.map(doc => {
    //       setDBT(doc.data().accessToken);

    //       // isSameToken && history.push('/app')
    //     });
    //   });
    // }
    // if (LST && DBT) {
    //   const isSameToken = LST === DBT;
    // }
  }, [history, LST]);

  return (
    <>
      <div className="login">
        <div className="login__container">
          <i className="fab fa-whatsapp"></i>

          <p>Sign in to Woocel</p>

          <Button className="google-btn" onClick={signIn}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
