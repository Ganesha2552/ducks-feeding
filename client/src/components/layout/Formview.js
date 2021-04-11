import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css";


import { fetchallRecords,deleteRecord,updateRecord } from "../../actions/feedingformAction";
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
      editid:"",
      errors: {},
      success:{}
    };
    this.time=React.createRef();

  }
  

    

      render() {
          console.log(this.props.success);
       
        var formdata=this.props.success;
     
        return (
        <div style={{ paddingTop:"30px" }} >
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
            {Object.keys(formdata).map((key)=>
                <tr id={key}>
                    <td>{formdata[key].ducks_count}</td>
                    <td>{formdata[key].food_quantity}</td>
                    <td>{formdata[key].food}</td>
                    <td>{formdata[key].food_type}</td>
                    <td>{formdata[key].place_fed}</td>
                    <td>{formdata[key].time_fed}</td>
                    <td>{formdata[key].autoschedule_enable?  <i class="material-icons">check</i>:<i class="material-icons">clear</i>}</td>
                    <td><a class="btn tooltipped" data-position="bottom" data-tooltip="Edit" alt="Edit" data-target="modaledit"  onClick={() => this.setState({editid:key})}><i class="material-icons">edit</i></a></td>
                    <td><a class="btn tooltipped modal-trigger" data-position="bottom" data-tooltip="Delete" alt="Delete" data-target="modal1"  onClick={() => this.setState({deleteid:key})}><i class="material-icons">delete_forever</i></a></td>
                </tr>
                )}
         
        </tbody>
      </table>
      <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Do you want to delete this record?</h4>
      <p>Note: On deleting daily scheduler will also be deleted</p>
    </div>
    <div class="modal-footer">
    <a class="modal-close waves-effect waves-green btn-flat">Cancel</a>

      <a onClick={this.deleteRecordFunc} class="modal-close waves-effect waves-green btn">Confirm</a>
    </div>
  </div>

  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Do you want to Edit this record?</h4>
      <p>Note: On Editing daily scheduler will also be edited</p>
    </div>
    <div class="modal-footer">
    <a class="modal-close waves-effect waves-green btn-flat">Cancel</a>

      <a onClick={this.editRecordFunc} class="modal-close waves-effect waves-green btn">Confirm</a>
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
    editRecordFunc=e=>{
       let id=e.currentTarget.parentNode.parentNode.getAttribute("id");
         // this.props.updateRecord();
     }
    componentWillReceiveProps(nextProps) {
      
        if (Object.keys(nextProps.success).length>0) {
          this.setState({
            success: nextProps.success
          });
          
      
        }
        
      
      }
    }
	


    Formview.propTypes = {
    fetchallRecords:PropTypes.func.isRequired,
    updateRecord:PropTypes.func.isRequired,
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