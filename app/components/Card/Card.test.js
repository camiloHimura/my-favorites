import React from 'react';
import { shallow } from 'enzyme';

import { Card } from './Card';
import Tag from '../generals/Tag';
import Tooltip from '../generals/Tooltip';

var Component;
const spyObj = {
  removeLink: jest.fn(),
  removeTagLink: jest.fn(),
}
const data = {id: 1991, 
              url: 'url test', 
              title: 'title test', 
              tags: [{id: 123}, {id: 456}, {id: 789}],
              description: 'fake description'}

beforeEach(() => {});

test('take snapshot', () => {
  Component = shallow(<Card {...data}/>);
  expect(Component).toMatchSnapshot();
});

test('render basic info', () => {
  const Component = shallow(<Card {...data}/>);
  expect(Component.find('h2').text()).toBe(data.title);
  expect(Component.find('.linkTitle').props().href).toBe(data.url);
  expect(Component.find('.description').text()).toBe(data.description);
});

test('render tags', () => {
  const Component = shallow(<Card {...data}/>);
  expect(Component.find(Tag)).toHaveLength(data.tags.length);
});

test('tooltip should be hidden', () => {
  const Component = shallow(<Card {...data}/>);
  expect(Component.find(Tooltip).props().hover).toBe(false);
});

test('show tooltip tooltip', () => {
  const Component = shallow(<Card {...data}/>);
  Component.find('.description').simulate('mouseEnter');
  expect(Component.find(Tooltip).props().hover).toBe(true);
});

test('trigger remove link', () => {
  const Component = shallow(<Card {...data} {...spyObj}/>);
  Component.find('.close').simulate('click');
  expect(spyObj.removeLink).toHaveBeenLastCalledWith(data.id);
});

test('trigger edit link', () => {
  const Component = shallow(<Card {...data} {...spyObj}/>);
  Component.find('.close').simulate('click');
  expect(spyObj.removeLink).toHaveBeenLastCalledWith(data.id);
});

test('remove a tag', () => {
  const Component = shallow(<Card {...data} {...spyObj}/>);
  Component.find(Tag).at(0).prop('onClose')();
  expect(spyObj.removeTagLink).toHaveBeenLastCalledWith(data.id, data.tags[0].id);
});

