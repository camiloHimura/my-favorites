import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import {validationMiddleware, localStorageMiddleware, errorMiddleware} from "../middleware"
import ReduxThunk from "redux-thunk"

const store = createStore(
  rootReducer,
  applyMiddleware(validationMiddleware, localStorageMiddleware, errorMiddleware, ReduxThunk)
);

export default store;
