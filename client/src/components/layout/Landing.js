import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import M from "materialize-css";
import { createRecord } from "../../actions/feedingformAction";
import { Redirect } from "react-router";


class Landing extends Component {

  constructor() {
    super();
    this.state = {
      ducks_count: "",
      food_quantity: "",
      food: "",
      place_fed: "",
      food_type: "",
      time_fed: "",
      autoschedule_enable: false,
      errors: {},
      success:{}
    };
    this.time=React.createRef();

  }
  componentDidMount(){


    console.log("mounting listener added");
    var context=this;
      var elems = document.querySelectorAll('.timepicker');
      M.Timepicker.init(elems, {twelveHour: false,onCloseEnd:context.timepickerVal});
    
        var elem = document.querySelectorAll('select');
        M.FormSelect.init(elem, {});
     
    
    
  }
  onSubmit = e => {
    e.preventDefault();
    var hrsnmin=this.state.time_fed.split(":");
    var today=new Date();
    var datetoday=today.getDate();
    var todayMonth=today.getMonth();
    var todayyear=today.getFullYear();
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)

    var d=new Date(todayyear,todayMonth,datetoday,hrsnmin[0],hrsnmin[1]).toUTCString().substring(17,22);
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

    console.log(d);
    const createRecord = {
    ducks_count: this.state.ducks_count,
    food_quantity: this.state.food_quantity,
    food: this.state.food,
    place_fed: this.state.place_fed,
    food_type: this.state.food_type,
    time_fed: this.state.time_fed,
    autoschedule_enable: this.state.autoschedule_enable,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    this.props.createRecord(createRecord, this.props.history);
    };
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });

  };
  timepickerVal= e=> {
    this.setState({time_fed:this.time.current.value});
  }
  handleCheckboxChange = e => {
    this.setState({
      autoschedule_enable: !this.state.autoschedule_enable,
    });

  };

  
    
  onLogoutClick = e => {
  e.preventDefault();
  this.props.logoutUser();
};
componentWillReceiveProps(nextProps) {
  console.log(Object.keys(nextProps.success).length);
  console.log(Object.keys(nextProps.errors).length);

  if (Object.keys(nextProps.success).length>0) {
    console.log(nextProps.success);
    this.setState({
      success: nextProps.success
    });
    setTimeout(()=> {
      this.setState({success: {}})
     window.location="/";
    }
      ,1000);

  }else if (Object.keys(nextProps.errors).length>0) {
    console.log(nextProps.errors);
    this.setState({errors: nextProps.errors});
    setTimeout(()=> {
      this.setState({errors: {}})},3000);
  }
  

}
render() {
  const { user } = this.props.auth;
  const { errors } = this.state;
  const { success } = this.state;
  if(user.isadmin){
    return (<Redirect to="/dashboard" />);
  }
    return (
      <div>
      <div  >
          <div >
            <h4>
              <b>Hi  {user.name.split(" ")[0]}! Welcome to Duck Feeding Research{" "}</b>
              
            </h4>
              
            <br />
            
          </div>
        
      </div>
      <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
         
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Fill the survey form</b> below
            </h4>
            <p className="grey-text text-darken-1">
            <span className="green-text"><b>{success.message}</b></span>

            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <input
                min="1"
                onChange={this.onChange}
                value={this.state.ducks_count}
                error={errors.ducks_count}
                id="ducks_count"
                type="number"
                className={classnames("", {
                  invalid: errors.ducks_count
                })}
              />
              <label htmlFor="ducks_count">Number of ducks fed</label>
              <span className="red-text">{errors.ducks_count}</span>
            </div>
            <div className="input-field col s12">
              <input
                min="1"
                onChange={this.onChange}
                value={this.state.food_quantity}
                error={errors.food_quantity}
                id="food_quantity"
                type="number"
                className={classnames("", {
                  invalid: errors.food_quantity
                })}
              />
              <label htmlFor="food_quantity">Quantity of food fed (in lbs)</label>
              <span className="red-text">{errors.food_quantity}</span>
            </div>
            <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.food}
                  error={errors.food}
                  id="food"
                  type="text"
                  className={classnames("", {
                    invalid: errors.food
                  })}
                />
                <label htmlFor="food">Food given</label>
                <span className="red-text">{errors.food}</span>
              </div>
    
         
      
              <div class="input-field col s12">
             
              <select id="food_type" onChange={this.onChange} error={errors.food_type} className={classnames("", {
                    invalid: errors.food_type
                  })}>
                <option value="" disabled selected>Choose an option</option>
                <option value="Grains" >Grains</option>
                <option value="Seeds and Nuts">Seeds & Nuts</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Other">Other</option>
              </select>
              
              <label htmlFor="food_type"> Food Category</label>
              <span className="red-text">{errors.food_type}</span>

                </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.place_fed}
                  error={errors.place_fed}
                  id="place_fed"
                  type="text"
                  className={classnames("", {
                    invalid: errors.place_fed
                  })}
                />
                <label htmlFor="place_fed">Place of Feeding</label>
                <span className="red-text">{errors.place_fed}</span>
              </div>
              <div className="input-field col s12">
              < input
                  
                  id="time_fed"
                  type="text"
                  className={classnames("timepicker", {
                    invalid: errors.time_fed
                  })} ref={this.time} />
               
                <label htmlFor="time_fed">Time of fed</label>
                <span className="red-text">{errors.time_fed}</span>
              </div>


            
            < label htmlFor="autoschedule_enable" className="input-field col s12">
             <input type="checkbox" defaultChecked={this.state.autoschedule_enable}  id="autoschedule_enable"  onChange={this.handleCheckboxChange}  value={this.state.autoschedule_enable}
                  error={errors.autoschedule_enable} className={classnames("filled-in", {
                    invalid: errors.autoschedule_enable
                  })} />
            <span >Enable daily insert of this record</span>
            <br></br>
            <span className="red-text">{errors.autoschedule_enable}</span>
              <span className="helper-text"  data-error="wrong" data-success="right">Note: This will auto push this record daily</span>

            
            </label>
            
             
            
            <div className="col s12" style={{ paddingTop:"30px",paddingLeft: "11.250px" }}>
              <button id="submitBtn"
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Submit
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    );
  }
}
Landing.propTypes = {
  createRecord: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success
});


export default connect(
  mapStateToProps,
  {createRecord}
)(Landing);