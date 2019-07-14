import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import {addArticleAction} from "../actions/index"
import {tagValidationMiddleware} from "../middleware"
import ReduxThunk from "redux-thunk"

const store = createStore(
    rootReducer,
    applyMiddleware(tagValidationMiddleware, ReduxThunk)
);

window.store = store;
window.addArticleAction = addArticleAction;

export default store;
