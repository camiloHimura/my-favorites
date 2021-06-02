import { iTag } from "../../../interfaces";
import { Actions } from "./AutoComplete";

interface ActionType {
  value?: string;
  initOptions?: iTag[];
  propertyFilter?: string;
  type: Actions.set | Actions.filter | Actions.sweepUp | Actions.sweepDown | Actions.clear;
}

interface State {
  options?: iTag[];
  initOptions?: iTag[];
  showOptions?: boolean;
  indexSelector?: number;
  propertyFilter?: string;
}

export default function reducer(state: State = {}, action: ActionType) {
  switch (action.type) {
    case Actions.set:
      return { ...state, initOptions: action.initOptions };

    case Actions.filter: {
      if (!Array.isArray(state.initOptions) || !action.propertyFilter) {
        return state;
      }

      const options = state.initOptions.filter((option) =>
        option[action.propertyFilter].includes(action.value),
      );
      return { ...state, options, showOptions: options.length > 0 ? true : false };
    }
    case Actions.sweepUp: {
      if (!Array.isArray(state.options)) {
        return state;
      }

      let indexSelector = !Number.isInteger(state.indexSelector) ? 0 : state.indexSelector;
      indexSelector -= 1;
      if (indexSelector < 0) {
        indexSelector = state.options.length - 1;
      }
      return { ...state, indexSelector };
    }
    case Actions.sweepDown: {
      if (!Array.isArray(state.options)) {
        return state;
      }
      let indexSelector = !Number.isInteger(state.indexSelector) ? 0 : state.indexSelector + 1;
      if (indexSelector >= state.options.length) {
        indexSelector = 0;
      }

      return { ...state, indexSelector };
    }
    case Actions.clear:
      return { ...state, indexSelector: null, showOptions: false };

    default:
      return state;
  }
}
