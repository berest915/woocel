import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthState from "./context/auth/AuthState";

import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage";
import SuccessPage from "./pages/SuccessPage";
import NotFoundPage from "./pages/NotFoundPage";

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
