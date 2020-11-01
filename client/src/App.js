import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthState from "./context/auth/AuthState";

import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage";
import SuccessPage from "./pages/SuccessPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContinuePage from "./pages/ContinuePage";

function App() {
  return (
    <>
      <AuthState>
          <div className="app">
            <Router>
            <Navbar />
              <div className="app__body">
                <Switch>
                  <Route exact path="/" component={LoginPage} />
                  <Route exact path="/app" component={SuccessPage} />
                  <Route exact path='/continue' component={ContinuePage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </Router>
          </div>
      </AuthState>
    </>
  );
}

export default App;
