import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import succesReducers from "./succesReducers";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: succesReducers,

});