import React from 'react';
import { shallow } from 'enzyme';

import { CreateLink } from './CreateLink';
import TagList from '../generals/TagList';

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

test('render TagList Component', () => {
  expect(Component.find(TagList)).toHaveLength(1)
})
/* 
test('sending form with invalid data', () => {
  Component.find('.createLink__send').simulate('click');
  expect(props.addLink).not.toHaveBeenCalled();
})
 */