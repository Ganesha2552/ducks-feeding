import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css";


import { fetchallRecords,deleteRecord } from "../../actions/feedingformAction";
class Formview extends Component {
    constructor(){
        super();
    this.state = {
      ducks_count: "",
      food_quantity: "",
      food: "",
      place_fed: "",
      food_type: "",
      time_fed: "",
      autoschedule_enable: false,
      deleteid:"",
      errors: {},
      success:{},
      successmessage:""
    };
    this.time=React.createRef();

  }
  

    

      render() {
          console.log(this.props.success);
       
        const { errors } = this.state;
        const { success } = this.state;
        var successmessage=this.state.successmessage;

        return (
           
        <div style={{ paddingTop:"30px" }} >
            
          
        <div className="center"><p className="grey-text text-darken-1"><span className="red-text"><b>{errors.message}</b></span></p>
        <p className="grey-text text-darken-1"><span className="green-text"><b>{successmessage}</b></span></p>
</div>
           <table className="highlight centered responsive-table">
        <thead>
          <tr>
              <th>Number of Ducks Fed</th>
              <th>Quantity of Food Fed (in lbs)</th>
              <th>Food Given</th>
              <th>Food Category</th>
              <th>Place of Feeding</th>
              <th>Time of Fed</th>
              <th>Daily insert of this record</th>
              <th></th>

          </tr>
        </thead>

        <tbody>
            {Object.keys(success).map((key)=>
                <tr id={key}>
                    <td>{success[key].ducks_count}</td>
                    <td>{success[key].food_quantity}</td>
                    <td>{success[key].food}</td>
                    <td>{success[key].food_type}</td>
                    <td>{success[key].place_fed}</td>
                    <td>{success[key].time_fed}</td>
                    <td>{success[key].autoschedule_enable?  <i className="material-icons">check</i>:<i className="material-icons">clear</i>}</td>
                    <td><a className="btn tooltipped modal-trigger" data-position="bottom" data-tooltip="Delete" alt="Delete" data-target="modal1"  onClick={() => this.setState({deleteid:key})}><i className="material-icons">delete_forever</i></a></td>
                </tr>
                )}
         
        </tbody>
      </table>
      <div id="modal1" className="modal">
    <div className="modal-content">
      <h4>Do you want to delete this record?</h4>
      <p>Note: On deleting daily scheduler will also be deleted</p>
    </div>
    <div className="modal-footer">
    <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>

      <a onClick={this.deleteRecordFunc} className="modal-close waves-effect waves-green btn">Confirm</a>
    </div>
  </div>

  
            
        </div>
  
        );
      }

    
    componentDidMount(){

             
                   this.props.fetchallRecords();
                   var elems = document.querySelectorAll('.tooltipped');
         M.Tooltip.init(elems, {});
         var elem = document.querySelectorAll('.modal');
         M.Modal.init(elem);
    

    }
    

   
    deleteRecordFunc=e=>{
        let id=this.state.deleteid;
        console.log(id)
        this.props.deleteRecord(this.state.deleteid);
    }
    
    componentWillReceiveProps(nextProps) {
        
        if (Object.keys(nextProps.success).length>0) {
            console.log("I am here:in success");
            console.log("I am here successprops:"+nextProps.success);
            console.log("I am here deleteid:"+this.state.deleteid);

            if (nextProps.success===this.state.deleteid){
            var copyobj=this.state.success;
            delete copyobj[this.state.deleteid];
           
            this.setState({
                deleteid:"",
                success:copyobj,
                successmessage:"Record deleted successfully!"
            });
            setTimeout(()=> {
                this.setState({successmessage: ""})},1000);
            

            
     
        }else {
            this.setState({
                success:nextProps.success
            })
        }
          
      
        }
        console.log(Object.keys(nextProps));
        console.log("I am here:");

       
        if(Object.keys(nextProps.errors).length>0){
            console.log("I am here:in error "+nextProps.errors.message);

            this.setState({
                errors: nextProps.errors
            }
              );
              
              setTimeout(()=> {
                this.setState({errors: {}})},3000);
            
          
            }
     
           
        
        
      
      }
    }
	


    Formview.propTypes = {
    fetchallRecords:PropTypes.func.isRequired,
    deleteRecord:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired

}  



const mapStateToProps = state => (
    
    {
    success: state.success,
    errors: state.errors,
  });
  
  
  export default connect(
    mapStateToProps,
    {fetchallRecords,deleteRecord},
   
      )(Formview);