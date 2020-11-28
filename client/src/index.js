import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BreakpointProvider } from "./IndexContextProvider/breakpoint";


const queries = {
  sm: "(max-width: 625px)"
}

ReactDOM.render(
  <React.StrictMode>
    <BreakpointProvider queries={queries}>
      <App />
    </BreakpointProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
