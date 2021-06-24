import 'jsdom-global/register';
import React from 'react';
import Icon from './Icon';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../utils/test';
const initialProps = { name: 'test', onClick: jest.fn(), pointer: true };
let Component;
beforeEach(() => {
  Component = setUp();
});

it('onclick prop is called', () => {
  findByTestAttr(Component, 'icon').simulate('click');
  expect(initialProps.onClick).toHaveBeenCalledTimes(1);
});

function setUp(props = {}) {
  return shallow(<Icon {...initialProps} {...props} />);
}
