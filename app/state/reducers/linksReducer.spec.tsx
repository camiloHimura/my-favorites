import { iLink, iTag } from '../../interfaces';
import {
  addLinkAction,
  linkLoadedAction,
  removeLinkAction,
  removeTagLinkAction,
  searchLinkAction,
} from '../actions';
import linksReducer from './linksReducer';

const tags = (id: string): iTag => ({ id, name: 'test' });
const mockData = (): iLink[] =>
  Array.from({ length: 3 }, (_, id) => ({
    id,
    title: `test ${id}`,
    url: 'url test',
    tags: [tags('1'), tags('2'), tags('3')],
  }));

describe('Links reducer', () => {
  it('return default store', () => {
    const newState = linksReducer(undefined, {} as any);
    expect(newState).toEqual([]);
  });

  it('receiving a ADD_LINK type', () => {
    const [newLink] = mockData();
    const newState = linksReducer(undefined, addLinkAction(newLink));
    expect(newState).toContain(newLink);
  });

  it('receiving a LINKS_LOADED type', () => {
    const newLinks = mockData();
    const newState = linksReducer(undefined, linkLoadedAction(newLinks));
    expect(newState).toEqual(newLinks);
  });

  it('receiving a REMOVE_LINK type', () => {
    const newLinks = mockData();
    let state = linksReducer(undefined, linkLoadedAction(newLinks));
    const [fistLink] = mockData();

    state = linksReducer(state, removeLinkAction(fistLink.id as string));
    expect(state).toEqual(expect.not.arrayContaining([fistLink]));
  });

  it('search by links name', () => {
    const links = mockData();
    const newState = linksReducer(links, searchLinkAction('test'));
    expect(newState.length).toBe(links.length);
  });

  it('search by unexisting name', () => {
    const links = mockData();
    const newState = linksReducer(links, searchLinkAction('noNames'));
    expect(newState.length).toBe(0);
  });

  it('search by specific name', () => {
    const links = mockData();
    const ramdonLink = links[links.length - 1];
    const [newState] = linksReducer(links, searchLinkAction(ramdonLink.title));
    expect(newState).toEqual(ramdonLink);
  });

  it('search by specific uppercase', () => {
    const links = mockData();
    const ramdonLink = links[links.length - 1];
    const [newState] = linksReducer(links, searchLinkAction(ramdonLink.title.toUpperCase()));
    expect(newState).toEqual(ramdonLink);
  });

  describe('receiving a REMOVE_TAG_LINK type', () => {
    it('getting tags id', () => {
      const newLinks = mockData();
      const [firstLink] = newLinks;
      const newState = linksReducer(
        newLinks,
        removeTagLinkAction({ linkId: firstLink.id, tagId: firstLink.tags[0].id }),
      );
      const [newFirstLink] = newState;
      expect(newFirstLink.tags).toContain(firstLink.tags[0]);
    });

    it('not getting tags id', () => {
      const newLinks = mockData();
      const [firstLinkMock] = mockData();
      const newState = linksReducer(
        newLinks,
        removeTagLinkAction({ linkId: firstLinkMock.id, tagId: 0 }),
      );
      const [firstLink] = newState;
      expect(firstLink.tags).toEqual(firstLinkMock.tags);
    });
  });
});
