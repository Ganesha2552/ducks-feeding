import React, { useState, useEffect } from 'react';
import {login} from "../../actions/auth"
import { useDispatch } from "react-redux";

const useLogin = ( validate:any) => {
    const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
  email: '',
  password: '',
});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e:any,name:string) => {
    const value  = e.target.value;
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
        const resp=login(values.email, values.password)
        resp(dispatch)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useLogin;