// react hooks + css
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
// @material ui
import Button from "@material-ui/core/Button";
// firebase
import { auth, provider } from "../../config/firebase";
import db from "../../config/firebase";
// react context
import authContext from "../../context/auth/authContext";

const Login = () => {
  const history = useHistory();
  const LST = localStorage.getItem("token");

  const { writeUserInfo, setAccessToken } = useContext(authContext);

  useEffect(() => {
    LST && history.push("/continue");
  }, [history, LST]);

  const signIn = async () => {
    // write auth relevant data into LST & db
    await auth
      .signInWithPopup(provider)
      .then(result => {
        writeUserInfo(result.user);
        setAccessToken(result.credential.accessToken);
        localStorage.setItem("token", result.credential.accessToken);
        // write auth-user info into db
        // ################################################### //
        db.collection("users")
          .doc(result.user.email)
          .set({
            accessToken: result.credential.accessToken,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
          })
          .then( () => {
            console.log("%cAuth User info successfully written!", "color:orange");
          })
          .catch( error =>  {
            console.error("Error writing auth-user-info: ", error);
          });
        // ################################################### //
      })
      .catch(error => alert(error.message));
    history.push("/app");
  };

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
