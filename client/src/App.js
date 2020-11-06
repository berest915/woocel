import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthState from "./context/auth/AuthState";

import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ContinuePage from "./pages/ContinuePage/ContinuePage";


function App() {
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
                  <Route exact path="/app" component={SuccessPage} />
                  <Route exact path="/continue" component={ContinuePage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      </AuthState>
    </>
  );
}

export default App;
