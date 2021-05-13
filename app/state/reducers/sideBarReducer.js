import { SHOW_INDEX, ERROR_INDEX } from '../actions/actions-types';

export default function sideBaReducer(state = { activeIndex: 0, errorIndex: 0 }, action) {
  switch (action.type) {
    case SHOW_INDEX:
      return Number.isInteger(action.payload) ? { ...state, activeIndex: action.payload } : state;

    case ERROR_INDEX:
      return Number.isInteger(action.payload) ? { ...state, errorIndex: action.payload } : state;

    default:
      return state;
  }
}
