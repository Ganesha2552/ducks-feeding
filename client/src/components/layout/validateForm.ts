export interface formfields {
    ducks_count: string;
    food_quantity: string;
    food: string;
    place_fed: string;
    food_type: string;
    time_fed:string;
    tz:string;
    autoschedule_enable: boolean;
  }
  
  export interface formfieldsError {
    ducks_count?: string;
    food_quantity?: string;
    food?: string;
    place_fed?: string;
    food_type?: string;
    time_fed?:string;
    tz?:string;
    autoschedule_enable?: string;
  }
  export default function validateRegister(values: formfields) {
    let errors: formfieldsError = {
        ducks_count: '',
        food_quantity: '',
        food: '',
        place_fed: '',
        food_type: '',
        time_fed:'',
        autoschedule_enable: '',
        tz:''
    };
    if (values.ducks_count !== null && !values.ducks_count) {
      errors.ducks_count = "Number of ducks fed field is required";
    } 
  
    if (!values.food_quantity) {
      errors.food_quantity = "Quantity of food is required";
    } 
  
    if (!values.food) {
      errors.food = "Food fed is required";
    } 
    if (!values.food_type) {
        errors.food_type = "Food category is required";
      } 

    if (!values.place_fed) {
      errors.place_fed = "Place of Fed is required";
    } 
    console.log(values)
    if (!values.time_fed) {
      errors.time_fed = "Time of Fed is required";
    } 
    // if (!values.autoschedule_enable) {
    //   errors.autoschedule_enable = "";
    // }
    return errors;
  }
  