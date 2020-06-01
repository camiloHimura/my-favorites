import {INVALID_TAG, INVALID_LINK} from "../actions/actions-types";

export default function addLinkReducer(state = {invalidTag: false, invalidLink: false}, action){
  switch(action.type){
    case INVALID_TAG:
        return Object.assign({}, state, {invalidTag: action.payload})

    case INVALID_LINK:
        return Object.assign({}, state, {invalidLink: action.payload})

    default: 
        return state;
  }
}