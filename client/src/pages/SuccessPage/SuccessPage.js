import { useState, useEffect } from "react";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import Chat from "../../coms/Chat/Chat";
import Sidebar from "../../coms/Sidebar/Sidebar";
import ChatInfo from "../../coms/ChatInfo/ChatInfo";
import "./SuccessPage.css";
import { useBreakpoint } from "../../IndexContextProvider/breakpoint";
import ToggleMobilePortal from "../../coms/ToggleMobilePortal/ToggleMobilePortal";

const SuccessPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onCloseModal = () => setIsOpen(false);
  const breakpoints = useBreakpoint();
  // media-controlled rendered-coms
  let isSm;
  Object.keys(breakpoints).map(media => {
    if (media === "sm" && breakpoints[media] === true) {
      isSm = true;
    }

    return null;
  });

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
            <Route exact path="/app">
              <ChatInfo />
            </Route>
            <Route exact path={`${path}/:roomId`}>
              <Chat />
            </Route>
            {isSm && (
              <ToggleMobilePortal isOpen={isOpen} onCloseModal={onCloseModal} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
