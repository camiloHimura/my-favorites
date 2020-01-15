import React from 'react';
import { Card } from './Card';
import Tag from '../generals/Tag';
import { shallow } from 'enzyme';

var Component;
const data = {id: 123, 
              url: 'url test', 
              title: 'title test', 
              tags: [123, 456, 678, 11],
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
