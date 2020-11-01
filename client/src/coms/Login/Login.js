import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Button from "@material-ui/core/Button";

import { auth, provider } from "../../config/firebase";
import db from "../../config/firebase";
import authContext from "../../context/auth/authContext";

const Login = () => {
  const history = useHistory();
  const { user, setUser, setAccessToken } = useContext(authContext);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result);
        setAccessToken(result.credential.accessToken);
        localStorage.setItem("token", result.credential.accessToken);
        
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    user && history.push("/app");
  }, [user, history]);

  return (
    <div className="login">
      <div className="login__container">
        <i className="fab fa-whatsapp"></i>

        <p>Sign in to Woocel</p>

        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
