import axios from "axios";
import { formfields } from "../components/layout/validateForm";

export const createRecord = (formData:formfields) => {
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
  