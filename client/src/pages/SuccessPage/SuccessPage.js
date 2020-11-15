import { useEffect } from "react";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import Chat from "../../coms/Chat/Chat";
import Sidebar from "../../coms/Sidebar/Sidebar";
import "./SuccessPage.css";

const SuccessPage = () => {
  const LST = localStorage.getItem("token");
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    !LST && history.push("/");
  }, [LST, history]);

  return (
    <>
      <div className="success">
        <div className="success__wrapper">
          <Sidebar path={path} />
          <div className="chat">
            <Route exact path='/app'>
              <div>bg-img as no room are selected</div>
            </Route>
            <Route exact path={`${path}/:roomId`}>
              <Chat />
            </Route>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
