import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

import Card from './Card';
import { findByTestAttr, storeFactory } from '../../utils/test';
import { iLink } from '../../interfaces';
import { Provider } from 'react-redux';
import { removeTagLinkAsyncAction, removeLinkAsyncAction } from '../../state/actions';

jest.mock('../generals/Tag', () => jest.fn((_) => `[Tag]`));
jest.mock('../generals/Tooltip', () => jest.fn((_) => `[Tooltip]`));

const setUpDispatch = jest.fn();
jest.mock('../../hooks/redux', () => ({
  useAppDispatch: () => setUpDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock('../../state/actions', () => ({
  removeTagLinkAsyncAction: jest.fn(),
  removeLinkAsyncAction: jest.fn(),
}));


const data: iLink = {
  id: 1991,
  url: 'url test',
  title: 'title test',
  description: 'fake description 2',
  tags: [{ id: 123, name: 'test', color: '#000' }, { id: 456, name: 'test', color: '#000' }, { id: 789, name: 'test', color: '#000' }],
};

beforeEach(() => {
  setUpDispatch.mockReset()
})

it('Should render component basic info', () => {
  const Component = setUp(data);
  expect(findByTestAttr(Component, 'title').text()).toBe(data.title);
  expect(findByTestAttr(Component, 'description').text()).toBe(data.description);
  expect((findByTestAttr(Component, 'link-url').props() as HTMLLinkElement).href).toBe(data.url);
});
;

it('Tooltip should be hidden', () => {
  const Component = setUp(data);
  expect(findByTestAttr(Component, 'cp-tooltip').prop('hover')).toBe(false);
});

it('Toogle tooltip, (updated setIsContHover)', () => {
  const Component = setUp(data);
  const buttton = findByTestAttr(Component, 'description');
  expect(findByTestAttr(Component, 'cp-tooltip').prop('hover')).toBe(false)
    ;
  buttton.simulate('mouseEnter');
  expect(findByTestAttr(Component, 'cp-tooltip').prop('hover')).toBe(true);

  buttton.simulate('mouseLeave');
  expect(findByTestAttr(Component, 'cp-tooltip').prop('hover')).toBe(false);
});

it('Should render Tags with the proper props', () => {
  const Component = setUp(data);
  const tags = findByTestAttr(Component, 'cp-tag');

  expect(tags).toHaveLength(data.tags.length);

  expect(tags.at(0).props()).toEqual(
    expect.objectContaining({
      ...data.tags[0],
      'data-test': 'cp-tag',
      isUpdateDisable: true,
      onClose: expect.any(Function),
    })
  );
});

it('Should call "removeTagLinkAsyncAction" when Tag "onClose" is fired', () => {
  const Component = setUp(data);
  const index = 0;
  const onClose = findByTestAttr(Component, 'cp-tag').at(index).prop('onClose') as Function;
  onClose();

  expect(setUpDispatch).toHaveBeenCalled();
  expect(removeTagLinkAsyncAction).toHaveBeenCalledWith(data.id, data.tags[index].id);
});

it('trigger remove link', () => {
  const Component = setUp(data);
  findByTestAttr(Component, 'btn-remove').simulate('click');

  expect(setUpDispatch).toHaveBeenCalled();
  expect(removeLinkAsyncAction).toHaveBeenCalledWith(data.id);
});

const setUp = (props: iLink = {}) => {
  const mockStore = storeFactory({});
  return mount(<Provider store={mockStore}> <Card {...props} /> </Provider>);
};