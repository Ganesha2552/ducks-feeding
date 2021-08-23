import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";
import { Action } from "redux";

export default interface IAction<T> extends Action<string> {
  type: string;
  payload?: T;
  error?: boolean;
  meta?: any;
}
const user = JSON.parse(localStorage.getItem("user") || "{}");
const token = localStorage.getItem("token") || "";
interface stateData {
  user: Object;
  token: string;
}
const initialState: stateData = user
  ? {  user, token }
  : {  user: {}, token :""};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: {},
        token :""
      };
    case REGISTER_FAIL:
      return {
        ...state,
        user: {},
        token :""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        
        user: payload.user,
        token: payload.token,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: {},
        token :""
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        token :""
      };
    default:
      return state;
  }
}
