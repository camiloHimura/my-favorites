import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import {validationMiddleware, localStorageMiddleware} from "../middleware"
import ReduxThunk from "redux-thunk"

const store = createStore(
  rootReducer,
  applyMiddleware(validationMiddleware, localStorageMiddleware, ReduxThunk)
);

export default store;
