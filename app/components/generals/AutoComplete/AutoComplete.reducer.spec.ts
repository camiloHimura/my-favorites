import { iTag } from '../../../interfaces';
import { Actions } from './AutoComplete';
import AutoCompleteReducer from './AutoComplete.reducer';

const testOptions: iTag[] = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];

describe('AutoCompleteReducer', () => {
  it('set initial options', () => {
    const newState = AutoCompleteReducer(undefined, { type: Actions.set, options: testOptions });
    expect(newState).toEqual({ options: testOptions });
  });

  it('filter options with not initOptions', () => {
    const newState = AutoCompleteReducer(undefined, {
      type: Actions.filter,
      propertyFilter: 'name',
      value: 'two',
    });
    expect(newState).toEqual({});
  });

  it('filter options with valid options', () => {
    let newState = AutoCompleteReducer(
      { options: testOptions },
      { type: Actions.filter, propertyFilter: 'name', value: 'two' },
    );
    expect(newState.options).toEqual([{ name: 'two' }]);

    newState = AutoCompleteReducer(
      { options: testOptions },
      { type: Actions.filter, propertyFilter: 'name', value: 't' },
    );
    expect(newState.options).toEqual([{ name: 'two' }, { name: 'three' }]);
  });

  it('clear indexSelector and showOptions', () => {
    const newState = AutoCompleteReducer(
      { options: testOptions, indexSelector: 2, showOptions: true },
      { type: Actions.clear },
    );
    expect(newState).toEqual({
      options: testOptions,
      indexSelector: null,
      showOptions: false,
    });
  });

  describe('update indexSelector', () => {
    it('sweepUp and sweepDown with null indexSelector and null options', () => {
      let newState = AutoCompleteReducer(undefined, { type: Actions.sweepUp });
      expect(newState).toEqual({});

      newState = AutoCompleteReducer(undefined, { type: Actions.sweepDown });
      expect(newState).toEqual({});
    });

    it('sweepUp with null indexSelector and valid options', () => {
      const newState = AutoCompleteReducer({ options: testOptions }, { type: Actions.sweepUp });
      expect(newState.indexSelector).toBe(testOptions.length - 1);
    });

    it('sweepUp with valid indexSelector and valid options', () => {
      const newState = AutoCompleteReducer(
        { options: testOptions, indexSelector: 1 },
        { type: Actions.sweepUp },
      );
      expect(newState.indexSelector).toBe(0);
    });

    it('sweepDown with null indexSelector and valid options', () => {
      const newState = AutoCompleteReducer({ options: testOptions }, { type: Actions.sweepDown });
      expect(newState.indexSelector).toBe(0);
    });

    it('sweepDown with valid indexSelector and valid options', () => {
      const newState = AutoCompleteReducer(
        { options: testOptions, indexSelector: 1 },
        { type: Actions.sweepDown },
      );
      expect(newState.indexSelector).toBe(2);
    });
  });
});
