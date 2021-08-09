import * as R from '../../../utils/R';

import { iTag } from '../../../interfaces';
import { Actions } from './AutoComplete';
import * as Utils from '../../../utils';

interface ActionType {
  value?: string;
  options?: iTag[];
  propertyFilter?: string;
  type: Actions.set | Actions.filter | Actions.sweepUp | Actions.sweepDown | Actions.reset;
}

interface State {
  options?: iTag[];
  showOptions?: boolean;
  indexSelector?: number;
}

export default function reducer(state: State = {}, action: ActionType): State {
  const mergeState = R.mergeRight(state);
  const isOptionsAnArray = (state) => Array.isArray(state?.options);

  switch (action.type) {
    case Actions.set:
      return mergeState({ options: action.options });

    case Actions.filter: {
      if (!isOptionsAnArray(state) || !action.propertyFilter) {
        return state;
      }

      const options = R.filter(
        (option) => R.includes(action.value, option[action.propertyFilter]),
        state.options,
      );

      return mergeState({ options, showOptions: R.gt(options.length, 0) });
    }

    case Actions.sweepUp: {
      const moveIndexUp = (data: State) =>
        R.pipe(
          R.unless(Utils.isNumber, R.always(0)),
          R.dec,
          R.when(R.gt(0), () => R.dec(R.length(data.options))),
        )(data.indexSelector);

      return R.when(isOptionsAnArray, R.mergeLeft({ indexSelector: moveIndexUp(state) }))(state);
    }

    case Actions.sweepDown: {
      const moveIndexDown = (data: State) =>
        R.pipe(
          R.ifElse(Utils.isNumber, R.inc, R.always(0)),
          R.when(R.gte(R.__, R.length(data.options)), R.always(0)),
        )(data.indexSelector);

      return R.when(isOptionsAnArray, R.mergeLeft({ indexSelector: moveIndexDown(state) }))(state);
    }

    case Actions.reset:
      return { indexSelector: null, showOptions: false, options: action.options };

    default:
      return state;
  }
}
