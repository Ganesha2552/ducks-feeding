import { combineReducers } from "redux";
import auth from "./authReducers";
import message from "./message";
import records from "./feedingReducers";

export default combineReducers({
  auth,
  message,
  records
});