import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import SignIn from "layouts/SignIn.js";
import SignInMobile from "layouts/SignInMobile.js";
import MobileUser from "layouts/MobileUser.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/mobile/home" component={MobileUser} />
      <Route path="/mobile" component={SignInMobile} />
      <Route path="/" component={SignIn} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
