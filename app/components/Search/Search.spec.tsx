import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';
import { iSearch } from '../../interfaces';

const onSearchLink = jest.fn();
const onGetAllLinks = jest.fn();
let spyObj: iSearch = {
  onSearchLink,
  onGetAllLinks,
};
let component;

beforeEach(() => {
  spyObj = {
    onSearchLink: jest.fn(),
    onGetAllLinks: jest.fn(),
  };
  component = shallow(<Search {...spyObj} />);
});

test('Shoud call onGetAllLinks', () => {
  component.find('input').simulate('input', { target: { value: '' } });
  expect(spyObj.onGetAllLinks).toHaveBeenCalled();
});

test('Shoud call onSearchLink', () => {
  const value = 'test';
  component.find('input').simulate('input', { target: { value } });
  expect(spyObj.onSearchLink).toHaveBeenCalledWith(value);
});
