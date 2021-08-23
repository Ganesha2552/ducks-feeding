import axios from "axios";

const setAuthToken = () => {
  const token:string|null = localStorage.getItem("token")!==null?localStorage.getItem("token"):"";

  if (token!=="") {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["x-access-token"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["x-access-token"];
  }
};
export default setAuthToken;