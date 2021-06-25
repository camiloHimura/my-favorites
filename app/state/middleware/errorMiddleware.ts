import { ADD_ERROR } from '../actions/actions-types';
import { setSideBarIndexAction } from '../actions';

const errorMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === ADD_ERROR) {
      dispatch(setSideBarIndexAction(getState().sideBar.errorIndex));
    }

    return next(action);
  };

export default errorMiddleware;
