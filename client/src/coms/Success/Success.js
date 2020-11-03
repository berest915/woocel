import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import authContext from "../../context/auth/authContext";
//! RENAME TO CONTENT-RELATED
const Success = () => {
  const history = useHistory();
  const { user } = useContext(authContext);

  useEffect(() => {
    !localStorage.getItem("token") && history.push("/");
  }, [user, history]);

  return (
    <>
      <div>Success</div>
    </>
  );
};

export default Success;
