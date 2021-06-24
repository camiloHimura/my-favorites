import { SET_LS_URL, SET_LS_TITLE, SET_LS_TAGS, CLEAR_LS } from '../actions/actions-types';
import { CREATE_LINK, LINK_DEFAULTS } from '../../contans/LStorageNames';
import LStorage from '../../utils/LStorage';
import { iAction, iLink, iTag } from '../../interfaces';

export default function localStorageReducer(state: iLink = {}, action: iAction<string | iTag[]>): iLink {
  if (state === undefined || Object.values(state).length === 0) {
    state = LStorage.has(CREATE_LINK) ? LStorage.get(CREATE_LINK) : LINK_DEFAULTS;
  }

  switch (action.type) {
    case SET_LS_URL:
      return { ...state, url: action.payload as string };

    case SET_LS_TITLE:
      return { ...state, title: action.payload as string };

    case SET_LS_TAGS:
      return { ...state, tags: action.payload as iTag[] };

    case CLEAR_LS:
      return LINK_DEFAULTS;

    default:
      return state;
  }
}
