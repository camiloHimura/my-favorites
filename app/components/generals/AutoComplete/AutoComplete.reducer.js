export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'set':
      return { ...state, initOptions: action.initOptions };

    case 'filter': {
      if (!Array.isArray(state.initOptions) || !action.propertyFilter) {
        return state;
      }

      const options = state.initOptions.filter((option) =>
        option[action.propertyFilter].includes(action.value),
      );
      return { ...state, options, showOptions: options.length > 0 ? true : false };
    }
    case 'sweepUp': {
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
    case 'sweepDown': {
      if (!Array.isArray(state.options)) {
        return state;
      }
      let indexSelector = !Number.isInteger(state.indexSelector) ? 0 : state.indexSelector + 1;
      if (indexSelector >= state.options.length) {
        indexSelector = 0;
      }

      return { ...state, indexSelector };
    }
    case 'clear':
      return { ...state, indexSelector: null, showOptions: false };

    default:
      return state;
  }
}
