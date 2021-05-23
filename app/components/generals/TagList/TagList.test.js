import React from 'react';
import { shallow } from 'enzyme';
import TagList from './TagList';

import { setPropTypes, findByTestAttr } from '../../../utils/test';

let Component;
const Options = [
  { id: 1, name: 'test 1' },
  { id: 2, name: 'test 2' },
  { id: 3, name: 'test 3' },
  { id: 4, name: 'test 4' },
];

const initialProps = {
  className: '',
  autoHide: true,
  options: Options,
  placeHolder: '',
  clearAfterSelecting: true,
  clearList: false,
  onTagsSaved: jest.fn(),
};
describe('Initial set up', () => {
  let generalProps;
  beforeEach(() => {
    generalProps = { onTagsSaved: jest.fn() };
    Component = setUp(generalProps);
  });
  it('checking prop types', () => {
    let response;
    const component = TagList;
    const requiredValues = {};
    response = setPropTypes({ component, requiredValues, prop: 'className', value: '' });
    expect(response).toBeUndefined();
    response = setPropTypes({ component, requiredValues, prop: 'autoHide', value: false });
    expect(response).toBeUndefined();
    response = setPropTypes({ component, requiredValues, prop: 'options', value: [] });
    expect(response).toBeUndefined();
    response = setPropTypes({ component, requiredValues, prop: 'placeHolder', value: '' });
    expect(response).toBeUndefined();
    response = setPropTypes({
      component,
      requiredValues,
      prop: 'clearAfterSelecting',
      value: false,
    });
    expect(response).toBeUndefined();
    response = setPropTypes({ component, requiredValues, prop: 'clearList', value: true });
    expect(response).toBeUndefined();
    response = setPropTypes({
      component,
      requiredValues,
      prop: 'onTagsSaved',
      value: () => {},
    });
    expect(response).toBeUndefined();
    response = setPropTypes({ component, requiredValues, prop: 'initialSavedTags', value: [] });
    expect(response).toBeUndefined();
  });

  it('autocomplete compoent rendered', () => {
    expect(findByTestAttr(Component, 'cp-autocomplete').length).toBe(1);
  });

  it('adding and rendering tags', () => {
    const selectedOptions = Options[0];
    const Autocomplete = findByTestAttr(Component, 'cp-autocomplete');
    Autocomplete.prop('onSelected')(selectedOptions);

    expect(Autocomplete.prop('options')).toEqual(Options);
    expect(generalProps.onTagsSaved).toHaveBeenCalledWith([selectedOptions]);
    expect(findByTestAttr(Component, 'cp-tag').length).toBe(1);
  });

  it('adding an options different to the props options', () => {
    const selectedOptions = 'different option';
    const Autocomplete = findByTestAttr(Component, 'cp-autocomplete');
    Autocomplete.prop('onSelected')(selectedOptions);

    expect(generalProps.onTagsSaved).not.toHaveBeenCalled();
    expect(findByTestAttr(Component, 'cp-tag').length).toBe(0);
  });

  it('adding initial saved tags', () => {
    Component = setUp({ ...generalProps, initialSavedTags: Options });
    expect(findByTestAttr(Component, 'cp-tag').length).toBe(Options.length);
  });

  it('adding alredy saved tag', () => {
    Component = setUp({ ...generalProps, initialSavedTags: Options });
    const Autocomplete = findByTestAttr(Component, 'cp-autocomplete');
    Autocomplete.prop('onSelected')(Options[0]);
    Autocomplete.prop('onSelected')(Options[0]);
    Autocomplete.prop('onSelected')(Options[0]);

    expect(findByTestAttr(Component, 'cp-tag').length).toBe(Options.length);
  });

  it('removing one tag', () => {
    Component = setUp({ ...generalProps, initialSavedTags: Options });
    findByTestAttr(Component, 'cp-tag').at(0).prop('onClose')(Options[0]);

    expect(findByTestAttr(Component, 'cp-tag').length).toBe(Options.length - 1);
  });
});

function setUp(props = {}) {
  return shallow(<TagList {...initialProps} {...props} />);
}
