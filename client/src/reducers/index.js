import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import succesReducers from "./succesReducers";
import feedingReducers from "./feedingReducers";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: succesReducers,
  fetchallRecords: feedingReducers,


});