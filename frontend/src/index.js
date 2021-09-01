import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = window.localStorage.getItem("sid");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
ReactDOM.render(<App />, document.getElementById("root"));

// <React.StrictMode>
// </React.StrictMode>,
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
