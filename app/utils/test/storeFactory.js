import {createStore} from "redux";
import rootReducer from "../../state/reducers";

export default function storeFactory(initialState) {
  return createStore(rootReducer, initialState);
}
