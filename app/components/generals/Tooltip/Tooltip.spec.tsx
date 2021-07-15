import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Tooltip from './Tooltip';

const parentRef = {
  current: {
    clientWidth: 0,
    scrollWidth: 10,
    clientHeight: 0,
    scrollHeight: 10,
  },
};

const defaultProps = {
  hover: false,
  text: 'test',
  parentRef,
  calcHeight: false,
};

describe('Initial set up', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('hover is false, dont show', () => {
    const Component = setUp({ ...defaultProps, calcHeight: true });
    act(() => jest.advanceTimersByTime(1000));
    Component.update();

    expect(Component.find('.show')).toHaveLength(0);
  });

  it('hover are true, show', () => {
    const Component = setUp({ ...defaultProps, calcHeight: true, hover: true });
    act(() => jest.advanceTimersByTime(1000));
    Component.update();

    expect(Component.find('.show')).toHaveLength(1);
  });
});

const setUp = (props = { ...defaultProps }) => mount(<Tooltip {...props} />);
