import {combineReducers} from "redux";

import links from "./linksReducer";
import tags from "./tagsReducer";
import validation from "./valitationReducer";

export default combineReducers({
    tags,
    links,
    validation,
})
