import { ADD_ERROR, REMOVE_ERROR } from '../actions/actions-types';
import { INVALIR_ERROR_FORMAT, INVALIR_ERROR_TYPE } from '../../contans/ErrorMessages';
import { ERROR_TYPES } from '../../contans';
import { iAction, iError } from '../../interfaces';

export default function addErrorReducer(state: iError[] = [], action: iAction<iError>): iError[] {
  if (action.type === ADD_ERROR) {
    console.log('new error', action);
  }

  switch (action.type) {
    case ADD_ERROR:
      if (isValidFormat(action) && isValidType(action)) {
        return [...state, action.payload];
      }
      return state;

    case REMOVE_ERROR:
      return state.filter((item) => item?.id !== (action.payload as unknown as string));

    default:
      return state;
  }
}

function isValidFormat(action) {
  if (
    !action.payload.type ||
    !action.payload.info ||
    action.payload.type == '' ||
    action.payload.info == ''
  ) {
    console.warn(INVALIR_ERROR_FORMAT);
    return false;
  }

  return true;
}

function isValidType(action) {
  if (!ERROR_TYPES.list.includes(action.payload.type)) {
    console.warn(INVALIR_ERROR_TYPE);
    return false;
  }
  return true;
}
