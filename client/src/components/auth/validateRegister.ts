export interface registerfields {
  fname: string;
  lname: string;
  email: string;
  password: string;
  password2: string;
  terms: boolean;
}

export interface registerfieldsError {
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  password2?: string;
  terms?: string;
}
export default function validateRegister(values: registerfields) {
  let errors: registerfieldsError = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    password2: "",
  };
  if (values.fname !== null && !values.fname.trim()) {
    errors.fname = "Firstname is required";
  } else if (values.fname.length < 3) {
    errors.fname = "Minimum 3 characters required";
  } else if (!/^[A-Za-z\s]+$/.test(values.fname)) {
    errors.fname = "Enter a valid First name";
  }

  if (!values.lname.trim()) {
    errors.lname = "Lastname is required";
  } else if (values.lname.length < 3) {
    errors.lname = "Minimum 3 characters required";
  } else if (!/^[A-Za-z\s]+$/.test(values.lname.trim())) {
    errors.lname = "Enter a valid Last name";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password needs min 8 characters with atleast 1 Number,1 Uppercase,1 Lowercase, 1 Special character";
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }
  if (!values.terms) {
    errors.terms = "Agree our terms to proceed";
  }
  return errors;
}
