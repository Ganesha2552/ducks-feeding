import axios from "axios";

export const registerUser = (
  fname: string,
  lname: string,
  email: string,
  password: string
) => {
  return axios.post("/api/users/register", {
    fname,
    lname,
    email,
    password,
  });
};

// Login - get user token
export const loginUser = (email: string, password: string) => {
  return axios.post("/api/users/login", { email, password });
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
