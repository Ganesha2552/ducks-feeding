import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchallRecords } from "../../actions/feedingformAction";

class Dashboard extends Component {
    

    

      render() {

        return (
        <div>
            <frameset >
            <frame src="https://analytics.zoho.com/open-view/2392865000000007976"></frame>        

            </frameset>
        </div>
  

        );
      }
    
    componentDidMount(){

             
               //     this.props.fetchallRecords();
    
        // this.props.fetchallRecords();

    }
    
    componentWillReceiveProps(nextProps) {
      
        if (Object.keys(nextProps.success).length>0) {
          this.setState({
            success: nextProps.success
          });
          
      
        }
        
      
      }
    }
	



const mapStateToProps = state => (
    
    {
    success: state.success,
  });
  
  
  export default connect(
    mapStateToProps,
    {fetchallRecords}
      )(Dashboard);