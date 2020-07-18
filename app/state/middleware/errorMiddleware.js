import {ADD_ERROR} from "../actions/actions-types";
import {setSideBarIndex} from "../actions";

export default function errorMiddleware({ dispatch, getState }){
  return function(next){
    return function(action){
      if(action.type === ADD_ERROR){
        dispatch(setSideBarIndex(getState().sideBar.errorIndex));
      }

      return next(action);
    }
  }
}