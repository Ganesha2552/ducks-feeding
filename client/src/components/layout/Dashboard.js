import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchallRecords } from "../../actions/feedingformAction";
import ReactApexChart from 'react-apexcharts'

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success:[],
          series: [],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              width:600,
              stacked: true,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            title: {
              text: 'Duck Feeding '
            },
            xaxis: {
              categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
              labels: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            yaxis: {
              title: {
                text: undefined
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
              offsetX: 40
            }
          },
        
        
        };
      }

    

      render() {
        console.log( this.state.success);

        return (
          
    <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.success} type="bar" height={350} />
</div>
  

        );
      }
    
    componentDidMount(){

             
                    this.props.fetchallRecords();
    
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
	


// Dashboard.propTypes = {
//     success: PropTypes.func.isRequired,

// }  



const mapStateToProps = state => (
    
    {
    success: state.success,
  });
  
  
  export default connect(
    mapStateToProps,
    {fetchallRecords}
      )(Dashboard);