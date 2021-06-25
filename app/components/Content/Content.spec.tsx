import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { iContent, iLink, iTag } from '../../interfaces';
import { useAppSelector } from '../../hooks/redux';
import { searchLinkAction, getAllLinksAction, getAllLinksByTagsAction } from '../../state/actions';
import { findByTestAttr, storeFactory } from '../../utils/test';

import Content, { eContent } from './Content';

jest.mock('../Card', () => jest.fn((_) => `[Content]`));
jest.mock('../Search', () => jest.fn((_) => `[Search]`));
jest.mock('../generals/TagList', () => jest.fn((_) => `[TagList]`));

jest.mock('../../state/actions', () => ({
  searchLinkAction: jest.fn(),
  getAllLinksAction: jest.fn(),
  getAllLinksByTagsAction: jest.fn(),
}));

const setUpDispatch = jest.fn();
jest.mock('../../hooks/redux', () => ({
  useAppDispatch: () => setUpDispatch,
  useAppSelector: jest.fn(),
}));

type AppFunction<T> = (tags: T) => void;

const linkData: iLink = {
  tags: [],
  url: 'test url',
  title: 'title test',
  description: 'test description',
};

const getLinks = (length: number): iLink[] =>
  Array.from({ length }, (_, index) => ({
    ...linkData,
    id: String(index),
  }));

const getTags = (length: number): iTag[] =>
  Array.from({ length }, (_, index) => ({ name: 'tagName', id: String(index) }));

beforeEach(() => {
  setUpDispatch.mockReset();
  (searchLinkAction as jest.Mock).mockReset();
  (getAllLinksAction as jest.Mock).mockReset();
  (getAllLinksByTagsAction as jest.Mock).mockReset();
});

it('Render loading links', () => {
  const numLoadingCards = 10;
  const Component = setUp({ links: [] }, { numLoadingCards });
  const Autocomplete = findByTestAttr(Component, 'cp-cardLoading');

  expect(Autocomplete.length).toBe(numLoadingCards);
});

it('Calls getAllLinks', () => {
  setUp({ links: [] });
  expect(getAllLinksAction).toHaveBeenCalled();
});

it('Should render Cards with the proper props', () => {
  const links = getLinks(3);
  const Component = setUp({ links });
  const cards = findByTestAttr(Component, 'cp-card');

  expect(cards).toHaveLength(links.length);
  expect(cards.at(0).props()).toEqual(
    expect.objectContaining({
      ...linkData,
      'data-test': 'cp-card',
    }),
  );
});

it('Should pass the proper props To TagList', () => {
  const tags = getTags(4);

  const Component = setUp({ tags, links: getLinks(1) });

  expect(findByTestAttr(Component, 'cp-tagList').props()).toEqual({
    options: tags,
    autoHide: false,
    'data-test': 'cp-tagList',
    clearAfterSelecting: true,
    className: eContent.tagListClass,
    onTagsSaved: expect.any(Function),
    placeHolder: eContent.tagListPlaceHolder,
  });
});

it('Should call "getAllLinksByTagsAction" when TagList "onTagsSaved" is fired', () => {
  // ids 0,1,2,3....
  const tags = getTags(2);
  const Component = setUp({ tags, links: getLinks(1) });
  const onTagsSaved = findByTestAttr(Component, 'cp-tagList').prop('onTagsSaved') as AppFunction<
    iTag[]
  >;
  onTagsSaved(tags);

  expect(setUpDispatch).toHaveBeenCalled();
  expect(getAllLinksByTagsAction).toHaveBeenCalledWith('0,1');
});

it('Should pass the proper props To Search', () => {
  const Component = setUp({ links: [] });

  expect(findByTestAttr(Component, 'cp-search').props()).toEqual({
    'data-test': 'cp-search',
    onSearchLink: expect.any(Function),
    onGetAllLinks: expect.any(Function),
  });
});

it('Should call "searchLinkAction" when Search "onSearchLink" is fired', () => {
  const linkTest = 'test';
  const Component = setUp({ links: [] });
  const onSearchLink = findByTestAttr(Component, 'cp-search').prop(
    'onSearchLink',
  ) as AppFunction<string>;
  onSearchLink(linkTest);

  expect(setUpDispatch).toHaveBeenCalled();
  expect(searchLinkAction).toHaveBeenCalledWith(linkTest);
});

it('Should call "getAllLinksAction" when Search "onGetAllLinks" is fired', () => {
  const Component = setUp({ links: [] });
  const onGetAllLinks = findByTestAttr(Component, 'cp-search').prop(
    'onGetAllLinks',
  ) as AppFunction<void>;
  onGetAllLinks();

  expect(setUpDispatch).toHaveBeenCalled();
  // the first call happen when the component was mounted
  expect(getAllLinksAction).toHaveBeenCalledTimes(2);
});

const setUp = (initialState = {}, props: iContent = { numLoadingCards: 2 }) => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => selector(initialState));
  const mockStore = storeFactory(initialState);

  return mount(
    <Provider store={mockStore}>
      {' '}
      <Content {...props} />{' '}
    </Provider>,
  );
};
