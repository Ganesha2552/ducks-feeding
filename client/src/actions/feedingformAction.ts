import axios from "axios";
import { GET_ERRORS,GET_FEEDING_DATA,GET_SUCCCESS } from "./types";
import { formfields } from "../components/layout/validateForm";

export const createRecord = (formData:formfields) => {
  console.log("here:createRecord")

    return axios
      .post("/api/feeding/create", formData);
  };

  export const fetchallRecords = () => {
   return axios
      .get("/api/feeding")
    
  };

  export const updateRecord = () =>  {
   return  axios
      .get("/api/feeding/update")
    
  };

  export const deleteRecord = (id:string) => {
   return axios
      .delete("/api/feeding/delete/"+id)
     };
  