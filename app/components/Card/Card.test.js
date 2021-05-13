import React from 'react';
import { shallow } from 'enzyme';

import { Card } from './Card';
import { setPropTypes, findByTestAttr } from '../../utils/test/';

var Component;
const spyObj = {
  editLink: jest.fn(),
  removeLink: jest.fn(),
  removeTagLink: jest.fn(),
};
const data = {
  id: 1991,
  url: 'url test',
  title: 'title test',
  tags: [{ id: 123 }, { id: 456 }, { id: 789 }],
  description: 'fake description',
};

it('checking prop types', () => {
  let response;
  const component = Card;
  const requiredValues = { id: 123, title: '', url: '' };
  response = setPropTypes({ component, requiredValues, prop: 'id', value: 123 });
  expect(response).toBeUndefined();

  response = setPropTypes({ component, requiredValues, prop: 'title', value: 'test' });
  expect(response).toBeUndefined();

  response = setPropTypes({ component, requiredValues, prop: 'url', value: 'url' });
  expect(response).toBeUndefined();

  response = setPropTypes({ component, requiredValues, prop: 'tags', value: [] });
  expect(response).toBeUndefined();
});

test('take snapshot', () => {
  Component = shallow(<Card {...data} />);
  expect(Component).toMatchSnapshot();
});

test('render basic info', () => {
  const Component = shallow(<Card {...data} />);
  expect(findByTestAttr(Component, 'title').text()).toBe(data.title);
  expect(findByTestAttr(Component, 'link-url').props().href).toBe(data.url);
  expect(findByTestAttr(Component, 'description').text()).toBe(data.description);
});

test('render tags', () => {
  const Component = shallow(<Card {...data} />);
  expect(findByTestAttr(Component, 'cp-tag')).toHaveLength(data.tags.length);
});

test('tooltip should be hidden', () => {
  const Component = shallow(<Card {...data} />);
  expect(findByTestAttr(Component, 'cp-tooltip').props().hover).toBe(false);
});

test('show tooltip tooltip', () => {
  const Component = shallow(<Card {...data} />);
  findByTestAttr(Component, 'description').simulate('mouseEnter');
  expect(findByTestAttr(Component, 'cp-tooltip').props().hover).toBe(true);
});

test('trigger remove link', () => {
  const Component = shallow(<Card {...data} {...spyObj} />);
  findByTestAttr(Component, 'btn-remove').simulate('click');
  expect(spyObj.removeLink).toHaveBeenLastCalledWith(data.id);
});

test('trigger edit link', () => {
  const Component = shallow(<Card {...data} {...spyObj} />);
  findByTestAttr(Component, 'btn-edit').simulate('click');
  expect(spyObj.editLink).toHaveBeenLastCalledWith(data.id);
});

test('remove a tag', () => {
  const Component = shallow(<Card {...data} {...spyObj} />);
  findByTestAttr(Component, 'cp-tag').at(0).prop('onClose')();
  expect(spyObj.removeTagLink).toHaveBeenLastCalledWith(data.id, data.tags[0].id);
});
