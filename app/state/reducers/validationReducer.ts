import { iAction } from '../../interfaces';
import iValidation from '../../interfaces/iValidation';
import { INVALID_TAG, INVALID_LINK } from '../actions/actions-types';

export default function ValidationReducer(
  state: iValidation = { invalidTag: false, invalidLink: false },
  action: iAction<boolean>,
): iValidation {
  switch (action.type) {
    case INVALID_TAG:
      return Object.assign({}, state, { invalidTag: action.payload });

    case INVALID_LINK:
      return Object.assign({}, state, { invalidLink: action.payload });

    default:
      return state;
  }
}
