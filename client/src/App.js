// react, react-router-dom + css
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// components
import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ContinuePage from "./pages/ContinuePage/ContinuePage";
import ToggleMobilePortal from "./coms/ToggleMobilePortal/ToggleMobilePortal";
// react contexts
import AuthState from "./context/auth/AuthState";
// mql hooks
import { useBreakpoint } from "./IndexContextProvider/breakpoint";

const App = () => {
  const breakpoints = useBreakpoint();
  const [isOpen, setIsOpen] = useState(true);
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  // media-controlled rendered-coms
  let isSm;
  Object.keys(breakpoints).map(media => {
    if (media === "sm" && breakpoints[media] === true) {
      isSm = true;
    }
    return null;
  });

  return (
    <>
      <AuthState>
        <div className="app">
          <Router>
            <div className="app__header">
              <div className="layout">
                <Navbar />
              </div>
            </div>

            <div className="app__body">
              <div className="page">
                <Switch>
                  <Route exact path="/" component={LoginPage} />
                  <Route path="/continue" component={ContinuePage} />
                  <Route path="/app" component={SuccessPage} />
                  <Route component={NotFoundPage} />
                </Switch>

                {isSm && (
                  <ToggleMobilePortal
                    isOpen={isOpen}
                    onCloseModal={onCloseModal}
                  />
                )}
              </div>
            </div>
          </Router>
        </div>
      </AuthState>
    </>
  );
};

export default App;
