import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import logo from '../../images/logo/logo192.png';


class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "./login";
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated);
    var navbarval;
    if (isAuthenticated) {
      return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper light-blue darken-1">
              <a href="/" className="brand-logo" ><img src={logo} alt="Duck Research" style={{ width: 48, height: 48, paddingTop: 20 }}></img>Duck Feeding Research</a>

              <ul id="nav-mobile" className="right hide-on-med-and-down">

                <li><Link
                  to="/formfeed"

                >
                  Duck Feeding Form
        </Link></li>
                <li><Link
                  to="/editrecord"

                >
                  Duck Feeding Record Edit
        </Link></li>
                <li><a onClick={this.onLogoutClick}>
                  Logout
        </a></li>


              </ul></div>
          </nav>


        </div>
      );
    } else {
      return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper light-blue darken-1">
              <a href="/" className="brand-logo" ><img src={logo} alt="Duck Research" style={{ width: 48, height: 48, paddingTop: 20 }}></img>Duck Feeding Research</a>
            </div>
          </nav>


        </div>
      );
    }




  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);