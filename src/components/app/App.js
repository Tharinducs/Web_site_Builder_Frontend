import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import routes from "../../routes";
import history from "../../_helpers/history";

const App = () => {
  return (
    <div className="App">
      <Router history={history} basename={"/"}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.layout(route.component, route.breadcrumbs)}
            />
          ))}
          <Redirect from="/home" to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
