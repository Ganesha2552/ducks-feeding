import { Router, Route, Redirect } from "react-router-dom";
import React, {  useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/layout/Dashboard";
import Register from "./components/auth/Register";
import Formview from "./components/layout/Formview";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import { history } from "./helpers/history";
import { clearMessage } from "./actions/message";


const App: React.FC = () => {
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    return history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);


  return (
    <Router history={history}>
      <div className="App">
        <Navbar />

        <Route
          exact
          path="/"
          render={() => {
            return Object.keys(currentUser).length === 0 ? (
              <Redirect to="/login" />
            ) : currentUser.isadmin ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/formfeed" />
            );
          }}
        />
        <Route
          exact
          path="/login"
          render={() => {
            return Object.keys(currentUser).length === 0 ? (
              <Redirect to="/login" />
            ) : currentUser.isadmin ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/formfeed" />
            );
          }}
        />
        <Route
          exact
          path="/register"
          render={() => {
            return Object.keys(currentUser).length === 0 ? (
              <Redirect to="/register" />
            ) : currentUser.isadmin ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/formfeed" />
            );
          }}
        />

        <Route
          exact
          path="/formfeed"
          render={() => {
            return Object.keys(currentUser).length === 0 ? (
              <Redirect to="/login" />
            ) : currentUser.isadmin ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/formfeed" />
            );
          }}
        />

        <Route
          exact
          path="/formview"
          render={() => {
            return Object.keys(currentUser).length === 0 ? (
              <Redirect to="/login" />
            ) : currentUser.isadmin ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/formview" />
            );
          }}
        />

        <Route
          exact
          path="/dashboard"
          render={() => {
            return Object.keys(currentUser).length === 0 ? (
              <Redirect to="/login" />
            ) : currentUser.isadmin ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/formview" />
            );
          }}
        />

        <Route exact path="/register" component={Register} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/formfeed" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/formview" component={Formview} />
      </div>
    </Router>
  );
};

export default App;
