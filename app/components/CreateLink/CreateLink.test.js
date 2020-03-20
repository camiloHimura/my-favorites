import React from 'react';
import { shallow } from 'enzyme';

import { CreateLink } from './CreateLink';
import AutoComplete from '../generals/AutoComplete';

var Component;
const props = {
  addLink: jest.fn()
}

test('take snapshot', () => {
  Component = shallow(<CreateLink {...props}/>);
  expect(Component).toMatchSnapshot();
});

test('render title input', () => {
  expect(Component.find('.createLink__contInputs__title')).toHaveLength(1)
})

test('render url input', () => {
  expect(Component.find('.createLink__contInputs__url')).toHaveLength(1)
})

test('render autoComplete Component', () => {
  expect(Component.find(AutoComplete)).toHaveLength(1)
})
/* 
test('sending form with invalid data', () => {
  Component.find('.createLink__send').simulate('click');
  expect(props.addLink).not.toHaveBeenCalled();
})
 */