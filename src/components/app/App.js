import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import routes from "../../routes";
import history from "../../_helpers/history";
import axios from "axios";
import {
  API_DOMAIN
} from "../../_helpers/constant"
import { getToken } from "../../store/actions/login"

const App = () => {
  let token = localStorage.getItem('loginToken');
  token = JSON.parse(token);
  //global url configurations
  axios.defaults.baseURL = `${API_DOMAIN}/api/`

  //token refresh on expired login token
  if (token && token.accesstoken) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.accesstoken}`;
    axios.interceptors.response.use((response) => {
      // Return a successful response back to the calling service
      return response;
    }, (error) => {
      if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true;
        return new Promise((resolve, reject) => {

          getToken(token.refreshToken,token.user.username)
            .then((respone) => {
              localStorage.setItem('loginToken', JSON.stringify(respone));
              const config = error.config;
              config.headers.Authorization = `Bearer ${respone.accesstoken}`;
              axios.defaults.headers.common.Authorization = `Bearer ${respone.accesstoken}`;
              resolve(axios(error.config));
            })
            .catch((err) => {
              Promise.reject(err);
            });
        });
      }
      return Promise.reject(error);
    });
  }

  //route configurations
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.layout(route.component, route.breadcrumbs)}
            />
          ))}
          {/* <Redirect to="/404" /> */}
        </Switch>
        
      </Router>
    </div>
  );
};

export default App;
