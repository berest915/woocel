import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import authContext from "../../context/auth/authContext";

const Success = () => {
  const history = useHistory();
  const { user } = useContext(authContext);

  useEffect(() => {
    !localStorage.getItem("token") && history.push("/");
  }, [user, history]);

  return <div style={{ color: "white" }}>Success</div>;
};

export default Success;

// #################################################### //
//* forbidden code
// const checkToken = () => {
//   db.collection("users")
//     .doc("berest915@gmail.com")
//     .onSnapshot((snapshot) => {
//       setDbToken(snapshot.data().accessToken);
//     });

//   if (dbToken && dbToken === localStorageToken) {
//     console.log("right token");
//   } else if (dbToken) {
//     console.log("token not same, modified-token?");
//     //! raise memory leak, need cleanup subscription
//     // history.push('/')
//   }
// };
// #################################################### //
