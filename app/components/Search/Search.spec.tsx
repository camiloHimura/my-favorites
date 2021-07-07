import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';
import { iSearch } from '../../interfaces';
import { findByTestAttr } from '../../utils/test';

let spyObj: iSearch = {
  onSearchLink: jest.fn(),
  onGetAllLinks: jest.fn(),
};

beforeEach(() => {
  jest.useFakeTimers();
  spyObj = {
    onSearchLink: jest.fn(),
    onGetAllLinks: jest.fn(),
  };
});

afterEach(() => {
  jest.useRealTimers();
});

test('Shoud call onGetAllLinks', () => {
  const component = shallow(<Search {...spyObj} />);
  findByTestAttr(component, 'cp-input').simulate('input', { target: { value: '' } });
  jest.advanceTimersByTime(1000);
  expect(spyObj.onGetAllLinks).toHaveBeenCalled();
});

test('Shoud call onSearchLink', () => {
  ['test', '0', 'false'].forEach((value) => {
    const component = shallow(<Search {...spyObj} />);
    findByTestAttr(component, 'cp-input').simulate('input', { target: { value } });
    jest.advanceTimersByTime(1000);
    expect(spyObj.onSearchLink).toHaveBeenCalledWith(value);
  });
});
