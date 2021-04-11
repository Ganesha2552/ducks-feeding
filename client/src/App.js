import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/layout/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";



// Check for token to keep user logged in
var userInfo;
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  userInfo=decoded;
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogined: localStorage.jwtToken,
      isadmin: localStorage.jwtToken?userInfo.isadmin:false
    };
  }


  render() {
    return (

      <Provider store={store} >
        <Router>
          <div className="App">
            <Navbar />

            <Route
              exact
              path="/"
              render={() => {
                return (
                  this.state.islogined ? this.state.isadmin ?
                  <Redirect to="/dashboard"/>
                    :
                    <Redirect to="/formfeed" /> :
                    <Redirect to="/login" />
                )
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                return (
                  this.state.islogined ?
                    <Redirect to="/formfeed" /> :
                    <Redirect to="/login" />
                )
              }}
            />
            <Route
              exact
              path="/register"
              render={() => {
                return (
                  this.state.islogined ?
                    <Redirect to="/formfeed" /> :
                    <Redirect to="/register" />
                )
              }}
            />
            
            
              <Route exact path="/register" component={Register} />

              <Route exact path="/login" component={Login} />
              
            <Switch>
              <PrivateRoute exact path="/formfeed" component={Landing} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />

            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;