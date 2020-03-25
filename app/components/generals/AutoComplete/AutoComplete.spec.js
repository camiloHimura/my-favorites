import React from 'react';
import { mount } from 'enzyme';
import { setPropTypes, findByTestAttr } from '../../../utils/test';

import AutoComplete from './AutoComplete';

let initialProps = {options: [], onSelected: jest.fn()}

it('take snapshot', () => {
  expect(setUp()).toMatchSnapshot();
});

it('checking prop types', () => {
  let response;
  const component = AutoComplete;
  const requiredValues = initialProps;

  response = setPropTypes({component, requiredValues, prop: 'options', value: []})
  expect(response).toBeUndefined();
  
  response = setPropTypes({component, requiredValues, prop: 'autoHide', value: true})
  expect(response).toBeUndefined();
  
  response = setPropTypes({component, requiredValues, prop: 'onSelected', value: () => {}})
  expect(response).toBeUndefined();
  
  response = setPropTypes({component, requiredValues, prop: 'placeHolder', value: 'test'})
  expect(response).toBeUndefined();
  
  response = setPropTypes({component, requiredValues, prop: 'propertyFilter', value: 'test 2'})
  expect(response).toBeUndefined();
  
  response = setPropTypes({component, requiredValues, prop: 'clearAfterSelecting', value: true})
  expect(response).toBeUndefined();
});

describe('hide and show options', () => {
  const component = setUp({propertyFilter: 'number', options: [{number: 'one'}, {number: 'two'}, {number: 'tree'}, {number: 'twelve'}]});  
  
  it('options are hidden', () => {
    expect(findByTestAttr(component, 'contOptions').length).toBe(1)
    expect(findByTestAttr(component, 'options').length).toBe(0)
  })

  it('user type an empty string', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: ''} });
    expect(findByTestAttr(component, 'options').length).toBe(0);
  })

  it('user type an valid string, show options', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw'} });
    expect(findByTestAttr(component, 'options').length).toBe(2);
  })

  it('clear the current options', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw'} });
    expect(findByTestAttr(component, 'options').length).toBe(2);
    findByTestAttr(component, 'input').simulate('change', { target: { value: ''} });
    expect(findByTestAttr(component, 'options').length).toBe(0);
  })
})

describe('options interactions', () => {
  const options = [{number: 'two'}, {number: 'twelve'}, {number: 'twenty'}];
  let component, testProps;

  beforeEach(() => {
    testProps = {propertyFilter: 'number', options, onSelected: jest.fn()};
    component = setUp(testProps);  
  })

  it('sweepUp, class "select" applied to the last option', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw'} });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 38 });
    const option = findByTestAttr(component, 'options').at(options.length - 1);

    expect(option.prop('className')).toBe('select');
  })
  
  it('sweepDown, class "select" applied to the first', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw'} });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 40 });
    const option = findByTestAttr(component, 'options').at(0);

    expect(option.prop('className')).toBe('select');
  })

  it('press enter with any option selected', () => {
    findByTestAttr(component, 'input').simulate('change', { target: { value: 'tw'} });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 13 });
    expect(component.find('.select').length).toBe(0);
    expect(testProps.onSelected).not.toHaveBeenCalled();
  })

   it('press enter with an option selected, clearAfterSelecting = false', () => {
    const typedValue = 'tw';
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue} });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 40 });
    expect(component.find('.select').length).toBe(1);

    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 13 });
    expect(testProps.onSelected).toHaveBeenCalled();
    expect(findByTestAttr(component, 'options').length).toBe(0);
    expect(findByTestAttr(component, 'input').instance().value).toContain(typedValue)
  })

  it('press enter with an option selected, clearAfterSelecting = true', () => {
    const typedValue = 'tw';
    component = setUp({...testProps, clearAfterSelecting: true});  
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue} });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 40 });
    findByTestAttr(component, 'input').simulate('keydown', { keyCode: 13 });
    expect(testProps.onSelected).toHaveBeenCalled();
    expect(findByTestAttr(component, 'input').instance().value).toBe('')
  })
  
  it('option clicked, clearAfterSelecting = false', () => {
    const typedValue = 'tw';
    const optionIndex = 1;
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue} });
    findByTestAttr(component, 'options').at(optionIndex).simulate('mousedown');
    
    expect(testProps.onSelected).toHaveBeenCalledWith(options[optionIndex]);
    expect(findByTestAttr(component, 'input').instance().value).toBe(options[optionIndex].number)
  })
  
  it('option clicked, clearAfterSelecting = true', () => {
    const typedValue = 'tw';
    const optionIndex = 1;
    component = setUp({...testProps, clearAfterSelecting: true});  
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue} });
    findByTestAttr(component, 'options').at(optionIndex).simulate('mousedown');
    
    expect(testProps.onSelected).toHaveBeenCalledWith(options[optionIndex]);
    expect(findByTestAttr(component, 'input').instance().value).toBe('')
  })
})

describe('closeOptions', () => {
  const options = [{number: 'two'}, {number: 'twelve'}, {number: 'twenty'}];

  it('clear options if autoHide = true', () => {
    const typedValue = 'tw';
    const component = setUp({options, propertyFilter: 'number'});  
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue} });
    findByTestAttr(component, 'input').simulate('blur');
    
    expect(findByTestAttr(component, 'options').length).toBe(0)
  })

  it('not clear options autoHide = false', () => {
    const typedValue = 'tw';
    const component = setUp({options, propertyFilter: 'number', autoHide: false});  
    findByTestAttr(component, 'input').simulate('change', { target: { value: typedValue} });
    findByTestAttr(component, 'input').simulate('blur');

    expect(findByTestAttr(component, 'options').length).toBeGreaterThan(0)
  })
})

function setUp(props = {}){
  return mount(<AutoComplete {...initialProps} {...props}/>);
}
