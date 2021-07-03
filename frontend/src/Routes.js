import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Layouts/Home";
import Register from "./Components/Login and Register/Register.jsx";
import Login from "./Components/Login and Register/Login.jsx";
import Validate from "./Components/Layouts/Validate.jsx";
function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/validate" exact component={Validate} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
