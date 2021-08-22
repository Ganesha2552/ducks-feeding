import { combineReducers } from "redux";
import auth from "./authReducers";
import message from "./message";

export default combineReducers({
  auth,
  message,
});