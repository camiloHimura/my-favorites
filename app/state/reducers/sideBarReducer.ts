import { iAction } from '../../interfaces';
import { SHOW_INDEX, ERROR_INDEX } from '../actions/actions-types';

export interface iProps {
  activeIndex: number;
  errorIndex: number;
}

export default function sideBarReducer(
  state: iProps = { activeIndex: 0, errorIndex: 0 },
  action: iAction<number>,
): iProps {
  switch (action.type) {
    case SHOW_INDEX:
      return Number.isInteger(action.payload) ? { ...state, activeIndex: action.payload } : state;

    case ERROR_INDEX:
      return Number.isInteger(action.payload) ? { ...state, errorIndex: action.payload } : state;

    default:
      return state;
  }
}
