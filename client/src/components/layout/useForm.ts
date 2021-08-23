import React, { useState, useEffect } from 'react';
import {register} from "../../actions/auth"
import { useDispatch } from "react-redux";
import { addRecord } from '../../actions/feeding';

const useForm = ( validate:any) => {
    const dispatch = useDispatch();

  const [values, setValues] = useState({
    ducks_count: '',
    food_quantity: '',
    food: '',
    place_fed: '',
    food_type: '',
    time_fed:'',
    tz:Intl.DateTimeFormat().resolvedOptions().timeZone,
    autoschedule_enable: false
  });
  const [errors, setErrors] = useState({ fname: '',
  ducks_count: '',
  food_quantity: '',
  food: '',
  place_fed: '',
  food_type: '',
  time_fed:'',
  tz:'',
  autoschedule_enable: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e:any,name:string) => {
    const value  = name==='autoschedule_enable'?e.target.checked:name==='time_fed'||name==='tz'?e:
    name==='place_fed'||name==="food_type"?e.target.innerText:e.target.value;
    console.log(name,value,name==='time_fed')
    setValues({
      ...values,
      [name]: value
    });
    console.log(values)
  };

  const handleSubmit = (e:React.MouseEvent) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.values(errors).every(x => x === null || x === '') && isSubmitting) {
        
        const resp=addRecord(values)
        console.log("resp",resp)
        //(values.ducks_count,values.food_quantity, values.food, values.place_fed,values.food_type,values.time_fed,values.autoschedule_enable)
        resp(dispatch)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;