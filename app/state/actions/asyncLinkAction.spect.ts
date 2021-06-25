import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../utils/axios.conf';
import { LINKS_LOADED } from './actions-types';
import { addLinkAction, removeTagLinkAction, removeLinkAction } from '.';
import {
  getAllLinks,
  getAllLinksByTags,
  addLink,
  removeTagLink,
  removeLink,
} from './asyncLinkAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions', () => {
  let store;

  beforeEach(() => {
    const initialState = {};
    moxios.install(instance);
    store = mockStore(initialState);
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  describe('getAllLinks', () => {
    const mockLink = { id: '123', title: 'test', url: 'url test', tags: [1, 2, 3] };
    const response = Array.from({ length: 3 }, () => mockLink);

    it('success request', async () => {
      setUpMoxios(200, response);

      await store.dispatch(getAllLinks());
      const [firstAction] = store.getActions();
      expect(firstAction.type).toBe(LINKS_LOADED);
      expect(firstAction.payload).toEqual(response);
    });

    it('getAllLinksByTags', async () => {
      setUpMoxios(200, response);

      await store.dispatch(getAllLinksByTags(''));
      const [firstAction] = store.getActions();
      expect(firstAction.type).toBe(LINKS_LOADED);
      expect(firstAction.payload).toEqual(response);
    });
  });

  describe('link operations', () => {
    it('addLink', async () => {
      const data = { id: '1991', title: 'test', url: 'url test', tags: [4, 3, 2, 1, 0] };
      const response = { data, status: 'saved' };
      setUpMoxios(200, response);

      await store.dispatch(addLink(data));
      const [firstAction] = store.getActions();
      expect(firstAction).toEqual(addLinkAction(data));
    });

    it('remove a tag in link', async () => {
      const linkId = '123';
      const tagId = '321';
      const response = { linkId, tagId, status: 'updated' };
      setUpMoxios(200, response);

      await store.dispatch(removeTagLink(linkId, tagId));
      const [firstAction] = store.getActions();
      expect(firstAction).toEqual(removeTagLinkAction({ linkId, tagId }));
    });

    it('remove link', async () => {
      const response = { status: 'removed' };
      setUpMoxios(200, response);

      await store.dispatch(removeLink('123'));
      const [firstAction] = store.getActions();
      expect(firstAction).toEqual(removeLinkAction('123'));
    });
  });
});

function setUpMoxios(status, response) {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({ status, response });
  });
}
