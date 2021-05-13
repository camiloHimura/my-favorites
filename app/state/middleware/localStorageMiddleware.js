import { SET_LS_URL, SET_LS_TITLE, SET_LS_TAGS, CLEAR_LS } from '../actions/actions-types';
import { CREATE_LINK, LINK_DEFAULTS } from '../../contans/LStorageNames';
import LStorage from '../../utils/LStorage';

export default function localStorageMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      if (action.type === SET_LS_TITLE && LStorage.has(CREATE_LINK)) {
        LStorage.set(CREATE_LINK, updateState({ title: action.payload }));
      }

      if (action.type === SET_LS_URL && LStorage.has(CREATE_LINK)) {
        LStorage.set(CREATE_LINK, updateState({ url: action.payload }));
      }

      if (action.type === SET_LS_TAGS && LStorage.has(CREATE_LINK)) {
        LStorage.set(CREATE_LINK, updateState({ tags: action.payload }));
      }

      if (action.type === CLEAR_LS) {
        LStorage.set(CREATE_LINK, LINK_DEFAULTS);
      }

      return next(action);
    };
  };
}

function updateState(data) {
  return Object.assign({}, LStorage.get(CREATE_LINK), data);
}
