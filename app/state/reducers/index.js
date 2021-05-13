import { combineReducers } from 'redux';

import links from './linksReducer';
import tags from './tagsReducer';
import validation from './validationReducer';
import localStorage from './localStorageReducer';
import errors from './errorsReducer';
import sideBar from './sideBarReducer';

export default combineReducers({
  tags,
  links,
  errors,
  sideBar,
  validation,
  localStorage,
});
