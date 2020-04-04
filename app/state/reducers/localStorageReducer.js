import {SET_LS_URL, SET_LS_TITLE, SET_LS_TAGS, CLEAR_LS} from '../actions/actions-types';
import { CREATE_LINK, LINK_DEFAULTS } from '../../contans/LStorageNames';
import LStorage from '../../utils/LStorage';

export default function localStorageReducer(state, action) {
  if(state === undefined){
    state = LStorage.has(CREATE_LINK)? LStorage.get(CREATE_LINK): LINK_DEFAULTS;
  }

  switch(action.type){
    case SET_LS_URL:
      return {...state, url: action.payload}
    
    case SET_LS_TITLE:
      return {...state, title: action.payload}
    
    case SET_LS_TAGS:
      return {...state, tags: action.payload}
    
    case CLEAR_LS:
      return LINK_DEFAULTS
    
    default: 
        return state;
  }
}