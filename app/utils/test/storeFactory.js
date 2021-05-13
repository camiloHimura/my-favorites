import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../state/reducers';
import { validationMiddleware } from '../../state/middleware';
import ReduxThunk from 'redux-thunk';

export default function storeFactory(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(validationMiddleware, ReduxThunk));
}
