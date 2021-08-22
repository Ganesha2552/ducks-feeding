import React, { useState, useEffect } from 'react';
import {register} from "../../actions/auth"
import { useDispatch } from "react-redux";

const useRegister = ( validate:any) => {
    const dispatch = useDispatch();

  const [values, setValues] = useState({
    fname: '',
    lname:'',
    email: '',
    password: '',
    password2: '',
    terms:false
  });
  const [errors, setErrors] = useState({ fname: '',
  lname:'',
  email: '',
  password: '',
  password2: '',
  terms:''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e:any,name:string) => {
    const value  = name==='terms'?e.target.checked:e.target.value;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e:React.MouseEvent) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.values(errors).every(x => x === null || x === '') && isSubmitting) {
        const resp=register(values.fname,values.lname, values.email, values.password)
        resp(dispatch)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useRegister;