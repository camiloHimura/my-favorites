/* eslint-disable react/display-name */
import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import { findByTestAttr } from '../../../utils/test';
import { iTag, iBoard } from '../../../interfaces';

const setOptions = jest.fn();
const tag: iTag = { name: 'test' };
const initialProps: iBoard<iTag> = {
  setOptions,
  isWrap: false,
  className: '',
  placeHolder: '',
  options: [tag, tag],
  Component: () => <h1>test</h1>,
};

beforeEach(() => {
  setOptions.mockReset();
});

it('render input element', () => {
  const input = findByTestAttr(setUp(), 'input');
  expect(input.length).toBe(1);
});

it('render container and elements', () => {
  const options: iTag[] = [tag, tag, tag, tag];
  const wrapper = setUp({ options, Component: () => <h1>Home</h1> });
  const container = findByTestAttr(wrapper, 'container');
  const element = findByTestAttr(wrapper, 'element');

  expect(container.length).toBe(1);
  expect(element.length).toBe(options.length);
});

it('should call setOptions when typing Enter', () => {
  const component = setUp();
  const name = 'test';
  const input = findByTestAttr(component, 'input');

  input.simulate('keydown', { keyCode: 13, target: { value: name } });

  expect(setOptions).toHaveBeenCalledWith({ name, color: expect.any(String) });
});

const setUp = (props = {}) => {
  const mergedProps = { ...initialProps, ...props };
  return shallow(<Board {...mergedProps} />);
};
