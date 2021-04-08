import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Landing extends Component {
  onLogoutClick = e => {
  e.preventDefault();
  this.props.logoutUser();
};
render() {
  const { user } = this.props.auth;

  
    return (

      <div style={{ height: "75vh" }} >
          <div >
            <h4>
              <b>Welcome  {user.name.split(" ")[0]}! to Duck Feeding Research{" "}</b>
              
            </h4>
              
            <br />
            
          </div>
        
      </div>
    );
  }
}
Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing);