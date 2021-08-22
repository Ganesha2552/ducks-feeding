export interface loginfields {
  email: string;
  password: string;
}

export interface loginfieldsError {
  email?: string;
  password?: string;
}
export default function validateLogin(values: loginfields) {
  let errors: loginfieldsError = { email: "", password: "" };

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}
