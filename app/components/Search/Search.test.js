import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';

let spyObj = {};
let component;

beforeEach(() => {
  spyObj = {
    searchLink: jest.fn(),
    getAllLinks: jest.fn(),
  };
  component = shallow(<Search {...spyObj} />);
});

test('call getAllLinks', () => {
  component.find('input').simulate('input', { target: { value: '' } });
  expect(spyObj.getAllLinks).toHaveBeenCalled();
});

test('call searchLink', () => {
  component.find('input').simulate('input', { target: { value: 'test' } });
  expect(spyObj.searchLink).toHaveBeenCalled();
});
