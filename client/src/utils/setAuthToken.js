import axios from "axios";
const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["x-access-token"] = token.replace("Bearer ","");
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["x-access-token"];
  }
};
export default setAuthToken;