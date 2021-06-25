import { ADD_TAG } from '../actions/actions-types';
import { invalidTag } from '../actions';

const validationMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === ADD_TAG && action.payload.name.length > 12) {
      return dispatch(invalidTag(true));
    }

    return next(action);
  };

export default validationMiddleware;
