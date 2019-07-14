import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import {addArticleAction} from "../actions/index"
import {tagValidationMiddleware} from "../middleware"


const store = createStore(
    rootReducer,
    applyMiddleware(tagValidationMiddleware)
);

window.store = store;
window.addArticleAction = addArticleAction;

export default store;
