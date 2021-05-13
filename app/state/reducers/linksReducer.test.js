import { ADD_LINK, LINKS_LOADED, REMOVE_LINK, REMOVE_TAG_LINK } from '../actions/actions-types';
import linksReducer from './linksReducer';
import { searchLinkAction } from '../actions';

function MockData() {
  return [
    {
      id: '123',
      title: 'test',
      url: 'url test',
      tags: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    },
    {
      id: '1234',
      title: 'test 2',
      url: 'url test 2',
      tags: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    },
    {
      id: '12345',
      title: 'test 3',
      url: 'url test 3',
      tags: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    },
  ];
}

describe('Links reducer', () => {
  it('return default store', () => {
    const newState = linksReducer(undefined, {});
    expect(newState).toEqual([]);
  });

  it('receiving a ADD_LINK type', () => {
    const [newLink] = MockData();
    const newState = linksReducer(undefined, {
      type: ADD_LINK,
      payload: newLink,
    });
    expect(newState).toContain(newLink);
  });

  it('receiving a LINKS_LOADED type', () => {
    const newLinks = MockData();
    const newState = linksReducer(undefined, {
      type: LINKS_LOADED,
      payload: newLinks,
    });
    expect(newState).toEqual(newLinks);
  });

  it('receiving a REMOVE_LINK type', () => {
    const newLinks = MockData();
    let state = linksReducer(undefined, { type: LINKS_LOADED, payload: newLinks });
    const [fistLink] = MockData();
    state = linksReducer(state, {
      type: REMOVE_LINK,
      payload: fistLink.id,
    });
    expect(state).toEqual(expect.not.arrayContaining([fistLink]));
  });

  it('search by links name', () => {
    const links = MockData();
    const newState = linksReducer(links, searchLinkAction('test'));
    expect(newState.length).toBe(links.length);
  });

  it('search by unexisting name', () => {
    const links = MockData();
    const newState = linksReducer(links, searchLinkAction('noNames'));
    expect(newState.length).toBe(0);
  });

  it('search by specific name', () => {
    const links = MockData();
    const ramdonLink = links[links.length - 1];
    const [newState] = linksReducer(links, searchLinkAction(ramdonLink.title));
    expect(newState).toEqual(ramdonLink);
  });

  it('search by specific uppercase', () => {
    const links = MockData();
    const ramdonLink = links[links.length - 1];
    const [newState] = linksReducer(links, searchLinkAction(ramdonLink.title.toUpperCase()));
    expect(newState).toEqual(ramdonLink);
  });

  describe('receiving a REMOVE_TAG_LINK type', () => {
    it('getting tags id', () => {
      const newLinks = MockData();
      const newState = linksReducer(newLinks, {
        type: REMOVE_TAG_LINK,
        payload: { linkId: '123', tagId: 3 },
      });
      const [firstLink] = newState;
      expect(firstLink.tags).toEqual([{ id: 1 }, { id: 2 }, { id: 4 }]);
    });

    it('not getting tags id', () => {
      const newLinks = MockData();
      const [firstLinkMock] = MockData();
      const newState = linksReducer(newLinks, {
        type: REMOVE_TAG_LINK,
        payload: { linkId: '123', tagId: 0 },
      });
      const [firstLink] = newState;
      expect(firstLink.tags).toEqual(firstLinkMock.tags);
    });
  });
});
