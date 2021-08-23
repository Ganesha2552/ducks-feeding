import {
    DELETE_FAIL,
    DELETE_SUCCESS,
    FORM_DATA_FAIL,
    GET_FEEDING_DATA,
    SET_MESSAGE,
  } from "./types";
import {createRecord,fetchallRecords,deleteRecord} from './feedingformAction'
import { formfields } from "../components/layout/validateForm";
import setAuthToken from "../utils/setAuthToken";
export const addRecord =(formData:formfields)=>(dispatch: any)=>{
return new Promise((resolve: any, reject: any) =>{
    setAuthToken()
    createRecord(formData).then(
        (response) => {

          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });

          return Promise.resolve(response.data);
        },
        (error) => {

          const message =
            error.response.data[Object.keys(error.response.data)[0]] ||
            error.message ||
            error.toString();

        //   dispatch({
        //     type: FORM_DATA_FAIL,
        //   });
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject(message);
        }
      );
    });
  };

  export const getAllRecords =()=>(dispatch: any)=>{
    return new Promise((resolve: any, reject: any) =>{
      
        setAuthToken()
        fetchallRecords().then(
            (response) => {
              dispatch({
                type: GET_FEEDING_DATA,
                payload: response.data,
              });
    
              return Promise.resolve(response.data);
            },
            (error) => {
              const message =
                error.response.data[Object.keys(error.response.data)[0]] ||
                error.message ||
                error.toString();
    
            //   dispatch({
            //     type: FORM_DATA_FAIL,
            //   });
              dispatch({
                type: FORM_DATA_FAIL,
                payload: {},
              });
    
              return Promise.reject(message);
            }
          );
        });
      };

      export const deleteFormRecord =(id:string)=>(dispatch: any)=>{
        return new Promise((resolve: any, reject: any) =>{
           
            setAuthToken()
            deleteRecord(id).then(
                (response) => {
                  dispatch({
                    type: DELETE_SUCCESS,
                    payload: {id},
                  });
                  dispatch({
                    type: SET_MESSAGE,
                    payload:'Record Deleted Successfully'
                  });
                  return Promise.resolve(response.data);
                },
                (error) => {
                  const message =
                    error.response.data[Object.keys(error.response.data)[0]] ||
                    error.message ||
                    error.toString();
        
                  dispatch({
                    type: SET_MESSAGE,
                    payload:'Error occurred while deleting record'
                  });
                  dispatch({
                    type: DELETE_FAIL,
                    payload: {},
                  });
        
                  return Promise.reject(message);
                }
              );
            });
          };