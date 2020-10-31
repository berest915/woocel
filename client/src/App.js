import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./layout/Navbar";
import Login from "./pages/Login/Login";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Router>
        <div className="app__body">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/app" component={SuccessPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
