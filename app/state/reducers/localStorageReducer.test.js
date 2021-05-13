import { setLsUrlAction, setLsTitleAction, setLsTagsAction, clearLsAction } from '../actions';
import localStorageReducer from './localStorageReducer';
import { LINK_DEFAULTS } from '../../contans/LStorageNames';

import LStorage from '../../utils/LStorage';
jest.mock('../../utils/LStorage');

const newLink = {
  title: 'title test',
  url: 'link test',
  tags: [
    { id: 1, name: 'tag 1' },
    { id: 2, name: 'tag 2' },
  ],
};

describe('standar initial state', () => {
  it('return default store', () => {
    const newState = localStorageReducer(undefined, {});
    expect(newState).toEqual(LINK_DEFAULTS);
  });

  it('set url', () => {
    const newState = localStorageReducer(undefined, setLsUrlAction(newLink.url));
    expect(newState.url).toBe(newLink.url);
  });

  it('set title', () => {
    const newState = localStorageReducer(undefined, setLsTitleAction(newLink.title));
    expect(newState.title).toBe(newLink.title);
  });

  it('set tags', () => {
    const newState = localStorageReducer(undefined, setLsTagsAction(newLink.tags));
    expect(newState.tags.length).toBe(newLink.tags.length);
    newState.tags.forEach((tag, index) => {
      expect(tag).toEqual(newLink.tags[index]);
    });
  });

  it('clear local storage', () => {
    const newState = localStorageReducer(newLink, clearLsAction());
    expect(newState.title).toBe('');
    expect(newState.url).toBe('');
    expect(newState.tags).toEqual([]);
  });
});

describe('localStorage initial state', () => {
  beforeEach(() => {
    LStorage.has.mockReturnValue(true);
    LStorage.get.mockReturnValue(newLink);
  });

  it('return default store', () => {
    const newState = localStorageReducer(undefined, {});
    expect(newState.title).toBe(newLink.title);
    expect(newState.url).toBe(newLink.url);
    expect(newState.tags).toEqual(newLink.tags);
  });
});
