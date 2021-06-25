import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { validationMiddleware, localStorageMiddleware, errorMiddleware } from '../middleware';
import ReduxThunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(validationMiddleware, localStorageMiddleware, errorMiddleware, ReduxThunk),
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
