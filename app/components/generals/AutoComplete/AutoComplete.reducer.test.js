import AutoCompleteReducer from './AutoComplete.reducer';

const testOptions = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];

describe('AutoCompleteReducer', () => {
  it('set unexisting action', () => {
    const initialState = { initOptions: testOptions };
    const newState = AutoCompleteReducer(initialState, { type: 'test' });
    expect(newState).toBe(initialState);
  });

  it('set initial options', () => {
    const newState = AutoCompleteReducer(undefined, { type: 'set', initOptions: testOptions });
    expect(newState).toEqual({ initOptions: testOptions });
  });

  it('filter options with not initOptions', () => {
    const newState = AutoCompleteReducer(undefined, {
      type: 'filter',
      propertyFilter: 'name',
      value: 'two',
    });
    expect(newState).toEqual({});
  });

  it('filter options with valid options', () => {
    let newState = AutoCompleteReducer(
      { initOptions: testOptions },
      { type: 'filter', propertyFilter: 'name', value: 'two' },
    );
    expect(newState.options).toEqual([{ name: 'two' }]);

    newState = AutoCompleteReducer(
      { initOptions: testOptions },
      { type: 'filter', propertyFilter: 'name', value: 't' },
    );
    expect(newState.options).toEqual([{ name: 'two' }, { name: 'three' }]);
  });

  it('clear indexSelector and showOptions', () => {
    let newState = AutoCompleteReducer(
      { initOptions: testOptions, indexSelector: 2, showOptions: true },
      { type: 'clear' },
    );
    expect(newState).toEqual({
      initOptions: testOptions,
      indexSelector: null,
      showOptions: false,
    });
  });

  describe('update indexSelector', () => {
    it('sweepUp and sweepDown with null indexSelector and null options', () => {
      let newState = AutoCompleteReducer(undefined, { type: 'sweepUp' });
      expect(newState).toEqual({});

      newState = AutoCompleteReducer(undefined, { type: 'sweepDown' });
      expect(newState).toEqual({});
    });

    it('sweepUp with null indexSelector and valid options', () => {
      const newState = AutoCompleteReducer({ options: testOptions }, { type: 'sweepUp' });
      expect(newState.indexSelector).toBe(testOptions.length - 1);
    });

    it('sweepUp with valid indexSelector and valid options', () => {
      const newState = AutoCompleteReducer(
        { options: testOptions, indexSelector: 1 },
        { type: 'sweepUp' },
      );
      expect(newState.indexSelector).toBe(0);
    });

    it('sweepDown with null indexSelector and valid options', () => {
      const newState = AutoCompleteReducer({ options: testOptions }, { type: 'sweepDown' });
      expect(newState.indexSelector).toBe(0);
    });

    it('sweepDown with valid indexSelector and valid options', () => {
      const newState = AutoCompleteReducer(
        { options: testOptions, indexSelector: 1 },
        { type: 'sweepDown' },
      );
      expect(newState.indexSelector).toBe(2);
    });
  });
});
