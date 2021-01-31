// react hooks + css
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
// @material ui
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
// firebase
import { auth, provider } from "../../config/firebase";
import db from "../../config/firebase";
// mql hooks
import { useBreakpoint } from "../../IndexContextProvider/breakpoint";
// react context
import authContext from "../../context/auth/authContext";

const Login = () => {
  const history = useHistory();
  const LST = localStorage.getItem("token");

  const breakpoints = useBreakpoint();
  // media-controlled rendered-coms
  let isMd;
  Object.keys(breakpoints).map(media => {
    if (media === "md" && breakpoints[media] === true) {
      isMd = true;
    }
    return null;
  });

  const { writeUserInfo, setAccessToken } = useContext(authContext);

  useEffect(() => {
    LST && history.push("/continue");
  }, [history, LST]);

  const signIn = async () => {
    // write auth relevant data into LST & db
    await auth
      .signInWithPopup(provider)
      .then(result => {
        
        writeUserInfo(result.user, result);
        setAccessToken(result.credential.accessToken);
        localStorage.setItem("token", result.credential.accessToken);
        // write auth-user info into db
        // ################################################### //
        db.collection("users")
          .doc(result.user.email)
          .set({
            accessToken: result.credential.accessToken,
            displayName: result.additionalUserInfo.profile.name,
            email: result.user.email,
            photoURL: result.user.photoURL,
          })
          .then(() => {
            console.log("Auth User info successfully written!");
          })
          .catch(error => {
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

        <Tooltip
          className="video-link"
          // title="watch this demo if hesitate to login"
          title={
            <>
              <p
                style={{
                  margin: "5px",
                  fontSize: ".7rem",
                  fontWeight: "bold",
                }}
              >
                watch this demo if hesitate to login
              </p>
            </>
          }
          placement={!isMd ? "right-end" : "bottom"}
        >
          <a
            href="https://youtu.be/lkqqRDXrpTk"
            alt="demo video link"
            target="_blank"
            rel="noreferrer"
          >
            check this out instead?
          </a>
        </Tooltip>
      </div>
    </>
  );
};

export default Login;
