import { Switch, Route } from "react-router-dom";

import Chat from "../../coms/Chat/Chat";
import Sidebar from "../../coms/Sidebar/Sidebar";
import "./SuccessPage.css";
const SuccessPage = ({ match }) => {

  return (
    <>
      <Switch>
        <>
          <div className="success">
            <div className="success__wrapper">
              <Route path={`${match.path}/:roomId`}>
                <Sidebar />
                <Chat />
              </Route>
              <Route exact path={match.path}>
                <Sidebar />
                <p>select</p>
              </Route>
            </div>
          </div>
        </>
      </Switch>
    </>
  );
};

export default SuccessPage;
