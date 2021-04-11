import { GET_FEEDING_DATA } from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
  console.log(action.type);

  switch (action.type) {
    case GET_FEEDING_DATA:
      return action.payload;
    default:
      return state;
  }
  
}