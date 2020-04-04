import {SET_LS_URL, SET_LS_TITLE, SET_LS_TAG, CLEAR_LS} from "../actions/actions-types";
const initialState = {url: '', title: '', tags: []}

export default function localStorageReducer(state = initialState, action) {
  switch(action.type){
    case SET_LS_URL:
      return {...state, url: action.payload}
    
    case SET_LS_TITLE:
      return {...state, title: action.payload}
    
    case SET_LS_TAG:
      return {...state, tags: action.payload}
    
    case CLEAR_LS:
      return initialState
    
    default: 
        return state;
  }
}