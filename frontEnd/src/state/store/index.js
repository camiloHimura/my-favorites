import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import {validationMiddleware} from "../middleware"
import ReduxThunk from "redux-thunk"

const store = createStore(
    rootReducer,
    applyMiddleware(validationMiddleware, ReduxThunk)
);

export default store;
