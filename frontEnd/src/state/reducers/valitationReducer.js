import {INVALID_TAG} from "../actions/actions-types";

export default function addLinkReducer(state = {invalidTag: false}, action){
    switch(action.type){
        case INVALID_TAG:
            return Object.assign({}, state, {invalidTag: action.payload})

        default: 
            return state;
    }
}