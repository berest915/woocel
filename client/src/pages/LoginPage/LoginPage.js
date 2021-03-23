// css
import "./LoginPage.css";
// components
import Login from "../../coms/Login/Login";

const LoginPage = () => {
  return (
    <>
      <div className="login">
        <div className="login__wrapper">
          <Login />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
