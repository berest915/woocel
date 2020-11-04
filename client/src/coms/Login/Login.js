import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

import Button from "@material-ui/core/Button";

import { auth, provider } from "../../config/firebase";
import db from "../../config/firebase";
import authContext from "../../context/auth/authContext";

const Login = () => {
  const history = useHistory();
  const LST = localStorage.getItem("token");
  const { writeUserInfo, setAccessToken } = useContext(authContext);

  const signIn = async () => {
    await auth
      .signInWithPopup(provider)
      .then(result => {
        writeUserInfo(result);
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
    history.push("/app");
  };

  useEffect(() => {
    LST && history.push("/continue");
  }, [history, LST]);

  return (
    <>
      <div className="login__container">
        <i className="fab fa-whatsapp"></i>
        <p>Sign in to Woocel</p>
        <Button className="google-btn" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default Login;