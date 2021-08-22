import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import jwt_decode from "jwt-decode";

import { registerUser, logoutUser, loginUser } from "./authActions";

export const register =
  (fname: string, lname: string, email: string, password: string) =>
  (dispatch: any) => {
    return new Promise((resolve: any, reject: any) => {
      return registerUser(fname, lname, email, password).then(
        (response) => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });

          return Promise.resolve(response.data);
        },
        (error) => {
          console.log(error.response);
          const message =
            error.response.data[Object.keys(error.response.data)[0]] ||
            error.message ||
            error.toString();

          dispatch({
            type: REGISTER_FAIL,
          });
          console.log(message);
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject(message);
        }
      );
    });
  };

export const login = (email: string, password: string) => (dispatch: any) => {
  return new Promise((resolve: any, reject: any) => {
    return loginUser(email, password).then(
      (response) => {
        localStorage.setItem(
          "user",
          JSON.stringify(jwt_decode(response.data.token))
        );
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: jwt_decode(response.data.token),
            token: response.data.token,
          },
        });
        console.log("here:::");
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.token,
        });
        return Promise.resolve(response.data);
      },
      (error) => {
        console.log(error.response);
        const message =
          error.response.data[Object.keys(error.response.data)[0]] ||
          error.message ||
          error.toString();
        console.log(message);
        dispatch({
          type: LOGIN_FAIL,
        });
        console.log(message);
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject(message);
      }
    );
  });
};

export const logout = () => (dispatch: any) => {
  logoutUser();

  dispatch({
    type: LOGOUT,
  });
};
