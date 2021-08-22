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
console.log(localStorage.getItem("user"));
const user = JSON.parse(localStorage.getItem("user") || "{}");
const token = localStorage.getItem("token") || "";
interface stateData {
  isLoggedIn: boolean;
  user: Object;
  token: string;
}
const initialState: stateData = user
  ? { isLoggedIn: true, user, token }
  : { isLoggedIn: false, user: {}, token };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        token: payload.token,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
}
