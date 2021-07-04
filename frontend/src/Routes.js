import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Authentication/Protected";
import Home from "./Components/Layouts/Home";
import Register from "./Components/Login and Register/Register.jsx";
import Login from "./Components/Login and Register/Login.jsx";
import Validate from "./Components/Layouts/Validate.jsx";
import ForgotPassword from "./Components/Login and Register/ForgotPassword.jsx";
function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/validate" exact component={Validate} />
          <Route path="/password" exact component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
