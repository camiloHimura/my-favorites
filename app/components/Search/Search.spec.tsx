import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';
import { iSearch } from '../../interfaces';
import { findByTestAttr } from '../../utils/test';

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
  findByTestAttr(component, 'cp-input').simulate('input', { target: { value: '' } });
  expect(spyObj.onGetAllLinks).toHaveBeenCalled();
});

test('Shoud call onSearchLink', () => {
  ['test', '0', 'false'].forEach((value) => {
    findByTestAttr(component, 'cp-input').simulate('input', { target: { value } });
    expect(spyObj.onSearchLink).toHaveBeenCalledWith(value);
  });
});
