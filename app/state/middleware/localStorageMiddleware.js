import {ADD_TAG} from "../actions/actions-types";
import {invalidTag} from "../actions";

export default function localStorageMiddleware({ dispatch }){
  return function(next){
    return function(action){
      console.log('action', action)
      return next(action);
    }
  }
}