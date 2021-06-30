import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../utils/test';

import AutoComplete from './AutoComplete';
import { iAutoComplete } from '../../../interfaces';

const initialProps: iAutoComplete = {
  options: [],
  onSelected: jest.fn(),
  propertyFilter: '',
  clearAfterSelecting: false,
};

describe('hide and show options', () => {
  const component = setUp({
    propertyFilter: 'number',
    options: [
      { id: 0, number: 'one' },
      { id: 1, number: 'two' },
      { id: 2, number: 'tree' },
      { id: 3, number: 'twelve' },
    ],
  });

  it('options are hidden', () => {
    expect(findByTestAttr(component, 'contOptions').length).toBe(1);
    expect(findByTestAttr(component, 'options').length).toBe(0);
  });

  it('user type an empty string', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: '' } });
    expect(findByTestAttr(component, 'options').length).toBe(0);
  });

  it('user type an valid string, show options', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw' } });
    expect(findByTestAttr(component, 'options').length).toBe(2);
  });

  it('clear the current options', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw' } });
    expect(findByTestAttr(component, 'options').length).toBe(2);
    findByTestAttr(component, 'input').simulate('change', { target: { value: '' } });
    expect(findByTestAttr(component, 'options').length).toBe(0);
  });
});

describe('options interactions', () => {
  const options = [
    { id: 0, number: 'two' },
    { id: 1, number: 'twelve' },
    { id: 2, number: 'twenty' },
  ];
  let component, testProps;

  beforeEach(() => {
    testProps = { propertyFilter: 'number', options, onSelected: jest.fn() };
    component = setUp(testProps);
  });

  it('sweepUp, class "select" applied to the last option', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw' } });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 38 });
    const option = findByTestAttr(component, 'options').at(options.length - 1);

    expect(option.prop('className')).toBe('select');
  });

  it('sweepDown, class "select" applied to the first', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw' } });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 40 });
    const option = findByTestAttr(component, 'options').at(0);

    expect(option.prop('className')).toBe('select');
  });

  it('press enter with any option selected', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw' } });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 13 });
    expect(component.find('.select').length).toBe(0);
    expect(testProps.onSelected).not.toHaveBeenCalled();
  });

  it('press enter with an option selected, clearAfterSelecting = false', () => {
    const typedValue = 'tw';
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue } });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 40 });
    expect(component.find('.select').length).toBe(1);

    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 13 });
    expect(testProps.onSelected).toHaveBeenCalled();
    expect(findByTestAttr(component, 'options').length).toBe(0);
    expect((findByTestAttr(component, 'input').instance() as any).value).toContain(typedValue);
  });

  it('press enter with an option selected, clearAfterSelecting = true', () => {
    const typedValue = 'tw';
    component = setUp({ ...testProps, clearAfterSelecting: true });
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue } });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 40 });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 13 });
    expect(testProps.onSelected).toHaveBeenCalled();
    expect((findByTestAttr(component, 'input').instance() as any).value).toBe('');
  });

  it('option clicked, clearAfterSelecting = false', () => {
    const typedValue = 'tw';
    const optionIndex = 1;
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue } });
    findByTestAttr(component, 'options').at(optionIndex).simulate('mousedown');

    expect(testProps.onSelected).toHaveBeenCalledWith(options[optionIndex]);
    expect((findByTestAttr(component, 'input').instance() as any).value).toBe(
      options[optionIndex].number,
    );
  });

  it('option clicked, clearAfterSelecting = true', () => {
    const typedValue = 'tw';
    const optionIndex = 1;
    component = setUp({ ...testProps, clearAfterSelecting: true });
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue } });
    findByTestAttr(component, 'options').at(optionIndex).simulate('mousedown');

    expect(testProps.onSelected).toHaveBeenCalledWith(options[optionIndex]);
    expect((findByTestAttr(component, 'input').instance() as any).value).toBe('');
  });
});

describe('closeOptions', () => {
  const options = [
    { id: 0, number: 'one' },
    { id: 1, number: 'two' },
    { id: 2, number: 'tree' },
  ];

  it('clear options if autoHide = true', () => {
    const typedValue = 'tw';
    const component = setUp({ options, propertyFilter: 'number' });
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue } });
    findByTestAttr(component, 'input').simulate('blur');

    expect(findByTestAttr(component, 'options').length).toBe(0);
  });

  it('not clear options autoHide = false', () => {
    const typedValue = 'tw';
    const component = setUp({ options, propertyFilter: 'number', autoHide: false });
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue } });
    findByTestAttr(component, 'input').simulate('blur');

    expect(findByTestAttr(component, 'options').length).toBeGreaterThan(0);
  });
});

function setUp(props = {}) {
  return mount(<AutoComplete {...initialProps} {...props} />);
}
