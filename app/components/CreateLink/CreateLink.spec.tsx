import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import CreateLink from './CreateLink';
import { asToHave, findByTestAttr, storeFactory } from '../../utils/test';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../state/store';
import {
  addLinkAsyncAction,
  getAllTagsAsyncAction,
  clearLsAction,
  setLsUrlAction,
  setLsTitleAction,
} from '../../state/actions';
import { Provider } from 'react-redux';

jest.mock('../../utils/LStorage');

jest.mock('../../state/actions', () => ({
  clearLsAction: jest.fn(),
  setLsUrlAction: jest.fn(),
  setLsTagsAction: jest.fn(),
  setLsTitleAction: jest.fn(),
  addLinkAsyncAction: jest.fn(),
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
    mocked(clearLsAction).mockReset();
    mocked(setLsUrlAction).mockReset();
    mocked(setLsTitleAction).mockReset();
    mocked(addLinkAsyncAction).mockReset();
    mocked(getAllTagsAsyncAction).mockReset();
  });

  it('Tag list is empty should call "getAllTagsAsyncAction"', () => {
    setUp();
    expect(getAllTagsAsyncAction).toHaveBeenCalled();
  });

  it('Render basic elements', () => {
    const haveItOne = asToHave(setUp(), 1);

    haveItOne('inp-title');
    haveItOne('inp-url');
    haveItOne('btn-send');
    haveItOne('cp-tagList');
  });

  fdescribe('interacting with imputs', () => {
    it('sending form with invalid data', () => {
      const Component = setUp();
      findByTestAttr(Component, 'btn-send').simulate('click');

      expect(addLinkAsyncAction).not.toHaveBeenCalled();
    });

    it('invalid title and valid url', () => {
      const Component = setUp();
      (findByTestAttr(Component, 'inp-url').instance() as any).value = 'url test';
      findByTestAttr(Component, 'inp-url').simulate('change');
      findByTestAttr(Component, 'btn-send').simulate('click');

      expect(setLsUrlAction).toHaveBeenCalled();
      expect(addLinkAsyncAction).not.toHaveBeenCalled();
    });

    it('valid title and invalid url', () => {
      const Component = setUp();
      (findByTestAttr(Component, 'inp-title').instance() as any).value = 'title test';
      findByTestAttr(Component, 'inp-title').simulate('change');
      findByTestAttr(Component, 'btn-send').simulate('click');

      expect(setLsTitleAction).toHaveBeenCalled();
      expect(addLinkAsyncAction).not.toHaveBeenCalled();
    });

    it('sending form with valid title and url', () => {
      const tags = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const newLink = { tags, url: 'test url', title: 'test title' };
      const Component = setUp({ tags, localStorage: { tags } });

      (findByTestAttr(Component, 'inp-title').instance() as any).value = newLink.title;
      findByTestAttr(Component, 'inp-title').simulate('change');
      (findByTestAttr(Component, 'inp-url').instance() as any).value = newLink.url;
      findByTestAttr(Component, 'inp-url').simulate('change');
      findByTestAttr(Component, 'btn-send').simulate('click');

      //we send the tags id not the whole obj
      expect(addLinkAsyncAction).toHaveBeenCalledWith({ ...newLink, tags: [1, 2, 3] });
      expect(clearLsAction).toHaveBeenCalled();

      expect((findByTestAttr(Component, 'inp-title').instance() as any).value).toBe('');
      expect((findByTestAttr(Component, 'inp-url').instance() as any).value).toBe('');
    });
  });
});

//Todo move the below code to MY CODE app
/* it('saving info in LStorage and keep it if the link is not sent to the endpoint', () => {
  let LStorageLink;
  LStorage.has.mockReturnValue(false);
  LStorage.get.mockReturnValue({});
  LStorage.set.mockImplementation((key, value) => LStorageLink = value);
  Component = setUp();

  findByTestAttr(Component, 'inp-title').instance().value = testLink.title;
  findByTestAttr(Component, 'inp-url').instance().value = testLink.url;
  act(() => {
    findByTestAttr(Component, 'cp-tagList').prop('onTagsSaved')(testLink.tags);
  })

  expect(LStorageLink).toEqual({...testLink});
}) */

/* function setUp(state = {}) {
  const initialState = { localStorage: {}, ...state };
  console.log(initialState);
  mocked(useAppSelector).mockImplementation((selector) => selector(initialState as RootState));
  return mount(<CreateLink />);
} */

const setUp = (initialState = {}) => {
  mocked(useAppSelector).mockImplementation((selector) => selector(initialState as RootState));
  const mockStore = storeFactory(initialState);

  return mount(
    <Provider store={mockStore}>
      <CreateLink />
    </Provider>,
  );
};
