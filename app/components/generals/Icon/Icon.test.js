import React from 'react';
import Icon from './Icon';
import { shallow } from 'enzyme';

import { setPropTypes, findByTestAttr } from '../../../utils/test';
const initialProps = { name: 'test', onClick: jest.fn() };
let Component;
beforeEach(() => {
  Component = setUp();
});
it('take snapshot', () => {
  expect(Component).toMatchSnapshot();
});

it('checking props types', () => {
  const requiredValues = { name: 'test', onClick: () => {} };
  let response;

  response = setPropTypes({ component: Icon, requiredValues, prop: 'name', value: 'test 2' });
  expect(response).toBeUndefined();

  response = setPropTypes({ component: Icon, requiredValues, prop: 'onClick', value: () => {} });
  expect(response).toBeUndefined();
});

it('onclick prop is called', () => {
  findByTestAttr(Component, 'icon').simulate('click');
  expect(initialProps.onClick).toHaveBeenCalledTimes(1);
});

function setUp(props = {}) {
  return shallow(<Icon {...initialProps} {...props} />);
}
