import React from 'react';
import { shallow } from 'enzyme';
import TagList from './TagList';

import { findByTestAttr } from '../../../utils/test';
import { iTag, iTagList } from '../../../interfaces';

let Component;
const Options: iTag[] = [
  { id: 1, name: 'test 1' },
  { id: 2, name: 'test 2' },
  { id: 3, name: 'test 3' },
  { id: 4, name: 'test 4' },
];

const initialProps: iTagList = {
  className: '',
  autoHide: true,
  options: Options,
  placeHolder: '',
  clearList: false,
  initialSavedTags: [],
  clearAfterSelecting: true,
  onTagsSaved: jest.fn(),
};

describe('Initial set up', () => {
  let generalProps;
  beforeEach(() => {
    generalProps = { onTagsSaved: jest.fn() };
    Component = setUp(generalProps);
  });

  it('autocomplete compoent rendered', () => {
    expect(findByTestAttr(Component, 'cp-autocomplete').length).toBe(1);
  });

  it('adding and rendering tags', () => {
    const selectedOptions = Options[0];
    const Autocomplete = findByTestAttr(Component, 'cp-autocomplete');
    const onSelected = Autocomplete.prop('onSelected') as Function;
    onSelected(selectedOptions);

    expect(Autocomplete.prop('options')).toEqual(Options);
    expect(generalProps.onTagsSaved).toHaveBeenCalledWith([selectedOptions]);
    expect(findByTestAttr(Component, 'cp-tag').length).toBe(1);
  });

  it('adding an options different to the props options', () => {
    const selectedOptions = 'different option';
    const Autocomplete = findByTestAttr(Component, 'cp-autocomplete');
    const onSelected = Autocomplete.prop('onSelected') as Function;
    onSelected(selectedOptions);

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
    const onSelected = Autocomplete.prop('onSelected') as Function;
    onSelected(Options[0]);
    onSelected(Options[0]);
    onSelected(Options[0]);

    expect(findByTestAttr(Component, 'cp-tag').length).toBe(Options.length);
  });

  it('removing one tag', () => {
    Component = setUp({ ...generalProps, initialSavedTags: Options });
    const onClose = findByTestAttr(Component, 'cp-tag').at(0).prop('onClose') as Function;;
    onClose(Options[0]);

    expect(findByTestAttr(Component, 'cp-tag').length).toBe(Options.length - 1);
  });
});

function setUp(props = {}) {
  return shallow(<TagList {...initialProps} {...props} />);
}
