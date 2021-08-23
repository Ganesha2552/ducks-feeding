import { GET_FEEDING_DATA,FORM_DATA_FAIL,DELETE_FAIL,DELETE_SUCCESS} from "../actions/types";
import IAction from './authReducers'

interface IObjectKeys {
  [key: string]: any;
}
interface stateData {
  records: IObjectKeys;
  isDeleted?: boolean;
}

const initialState:stateData = {
  records:{},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action:IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case GET_FEEDING_DATA:

      return { ...state,
        records:payload
      }
    case FORM_DATA_FAIL:
      return{
        ...state,
        records:{}
      }
      case DELETE_FAIL:

        return { ...state,
          isDeleted:false
        }
      case DELETE_SUCCESS:
        let newState = Object.keys(state.records).reduce((r:any, e:any) => {
          if(payload.id!==e) r[e] = state.records[e];
          return r
        }, {})
        return{
          ...state,
          isDeleted:true,
          records: newState
        }
    default:
      return state;
  }
  
}