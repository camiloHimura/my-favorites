import {combineReducers} from "redux";

import links from "./linksReducer";
import tags from "./tagsReducer";
import validation from "./validationReducer";
import localStorage from "./localStorageReducer";

export default combineReducers({
  tags,
  links,
  validation,
  localStorage
})
