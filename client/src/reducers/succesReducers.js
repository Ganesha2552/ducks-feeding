import { GET_SUCCCESS } from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
  console.log(action.type);

  switch (action.type) {
    case GET_SUCCCESS:
      return action.payload;
    default:
      return state;
  }
  
}