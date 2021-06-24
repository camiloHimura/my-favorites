import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import TagBox from './TagBox';
import Board from '../generals/Board';
import Tag from '../generals/Tag';

import { findByTestAttr, storeFactory } from '../../utils/test';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../state/store';
import {
  addTagAsyncAction,
  getAllTagsAsyncAction,
  removeTagAsyncAction,
} from '../../state/actions';
import { Provider } from 'react-redux';
import { iBoard, iTag } from '../../interfaces';

jest.mock('../generals/Board', () => jest.fn((props) => props.Component()));

jest.mock('../../state/actions', () => ({
  addTagAsyncAction: jest.fn(),
  removeTagAsyncAction: jest.fn(),
  getAllTagsAsyncAction: jest.fn(),
}));

const setUpDispatch = jest.fn();
jest.mock('../../hooks/redux', () => ({
  useAppDispatch: () => setUpDispatch,
  useAppSelector: jest.fn(),
}));

fdescribe('Initial set up', () => {
  beforeEach(() => {
    setUpDispatch.mockReset();
    mocked(addTagAsyncAction).mockReset();
    mocked(removeTagAsyncAction).mockReset();
    mocked(getAllTagsAsyncAction).mockReset();
  });

  it('should call getAllTagsAsyncAction after mounthing the component', () => {
    setUp();
    expect(getAllTagsAsyncAction).toHaveBeenCalledTimes(1);
  });

  it('should show a message if there an invalid tag', () => {
    const component = setUp({ validation: { invalidTag: true } });

    expect(findByTestAttr(component, 'invalid-tag')).toHaveLength(1);
  });

  it('check Board props', () => {
    const tags: iTag[] = [
      { name: 'test', id: 0 },
      { name: 'test2', id: 1 },
    ];
    const component = setUp({ tags });

    expect(component.find(Board).props()).toEqual(
      expect.objectContaining({
        isWrap: true,
        options: tags,
      }),
    );
  });

  it('should call removeTagAsyncAction clicking the tags close buttom', () => {
    const index = 1;
    const tags: iTag[] = [
      { name: 'test', id: 0 },
      { name: 'test2', id: 1 },
    ];

    mocked(Board).mockImplementationOnce((props: iBoard<iTag>) =>
      props.Component(props.options[index]),
    );

    const component = setUp({ tags });
    const onClose = component.find(Tag).prop('onClose') as (tag: iTag) => void;
    onClose(tags[index]);

    expect(removeTagAsyncAction).toHaveBeenCalledWith(tags[index].id);
  });
});

const setUp = (initialState = {}) => {
  const defaultState = { validation: { invalidTag: false }, tags: [], ...initialState };

  mocked(useAppSelector).mockImplementation((selector) => selector(defaultState as RootState));
  const mockStore = storeFactory(initialState);

  return mount(
    <Provider store={mockStore}>
      <TagBox />
    </Provider>,
  );
};
