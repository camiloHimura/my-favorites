/* eslint-disable react/display-name */
import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';
import { setPropTypes, findByTestAttr } from '../../../utils/test';

let initialProps = { options: [1, 2], Component: () => <h1>test</h1>, setOptions: jest.fn() };

it('checking props types', () => {
  const requiredValues = initialProps;
  let response;

  response = setPropTypes({ component: Board, requiredValues, prop: 'options', value: [] });
  expect(response).toBeUndefined();

  response = setPropTypes({
    component: Board,
    requiredValues,
    prop: 'setOptions',
    value: () => {},
  });
  expect(response).toBeUndefined();

  response = setPropTypes({ component: Board, requiredValues, prop: 'isWrap', value: true });
  expect(response).toBeUndefined();

  response = setPropTypes({ component: Board, requiredValues, prop: 'className', value: 'test' });
  expect(response).toBeUndefined();

  response = setPropTypes({
    component: Board,
    requiredValues,
    prop: 'placeHolder',
    value: 'test 2',
  });
  expect(response).toBeUndefined();

  response = setPropTypes({
    component: Board,
    requiredValues,
    prop: 'Component',
    value: () => {},
  });
  expect(response).toBeUndefined();
});

it('render input element', () => {
  const input = findByTestAttr(setUp(), 'input');
  expect(input.length).toBe(1);
});

it('render container and elements', () => {
  const options = [1, 2, 3, 4];
  const wrapper = setUp({ options, Component: () => <h1>Home</h1> });
  const container = findByTestAttr(wrapper, 'container');
  const element = findByTestAttr(wrapper, 'element');

  expect(container.length).toBe(1);
  expect(element.length).toBe(options.length);
});

function setUp(props = {}) {
  const mergedProps = { ...initialProps, ...props };
  return shallow(<Board {...mergedProps} />);
}
