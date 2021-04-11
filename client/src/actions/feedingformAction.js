import axios from "axios";
import { GET_ERRORS,GET_FEEDING_DATA,GET_SUCCCESS } from "./types";

export const createRecord = (formData, history) => dispatch => {
    axios
      .post("/api/feeding/create", formData)
      .then(res => 
        { 
          console.log(res);
          dispatch({
        type: GET_SUCCCESS,
        payload: res.data
      })
      console.log("after dispatch");

    }
      
      )
      .catch(err =>
        {
          

        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
      );
  };

  export const fetchallRecords = () => dispatch => {
    axios
      .get("/api/feeding")
      .then(res => 
        { 
          dispatch({
        type: GET_SUCCCESS,
        payload: res.data
      })
    }
      
      )
      .catch(err =>
        {
          

        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
      );
  };