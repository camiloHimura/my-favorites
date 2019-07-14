import {ADD_TAG} from "../actions/actions-types";
import {invalidTag} from "../actions";

export default function tagValidationMiddleware({ dispatch }){
    return function(next){
        return function(action){
            if(action.type === ADD_TAG && action.payload.name.length > 12){
                return dispatch(invalidTag(true));
            }

            return next(action);
        }
    }
}