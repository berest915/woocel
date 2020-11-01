import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Continue.css";

import authContext from "../../context/auth/authContext";

const Continue = () => {
  const history = useHistory();
  // const {} = useContext(authContext)

  useEffect(() => {});

  return (
    <>
      <div className="continue">
        <div className="continue__container">
          <p>You currently sign in as</p>
          {/* <p>{user.email}</p> */}
        </div>
      </div>
    </>
  );
};

export default Continue;
