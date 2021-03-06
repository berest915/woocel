// react-router-dom + css
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// components
import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ContinuePage from "./pages/ContinuePage/ContinuePage";
// react contexts
import AuthState from "./context/auth/AuthState";
import RoomState from "./context/room/RoomState";

const App = () => {
  return (
    <>
      <AuthState>
        <RoomState>
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
                </div>
              </div>
            </Router>
          </div>
        </RoomState>
      </AuthState>
    </>
  );
};

export default App;
