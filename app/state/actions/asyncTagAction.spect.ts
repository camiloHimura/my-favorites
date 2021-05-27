import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAllTags, addTag, removeTag, updateTag } from './asyncTagAction';
import { addTagAction, removeTagAction, updateTagAction, tagsLoadedAction } from './index';
import moxios from 'moxios';
import instance from '../../utils/axios.conf';

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

  it('getAllTags', async () => {
    const mockTag = { id: '123', name: 'test', color: 'red' };
    const response = Array.from({ length: 3 }, () => mockTag);
    setUpMoxios(200, response);

    await store.dispatch(getAllTags());
    const [firstAction] = store.getActions();
    expect(firstAction).toEqual(tagsLoadedAction(response));
  });

  it('addTag', async () => {
    const data = { color: '73B1BF', id: '5d16801384deb893dbd11fd8', name: 'tutorial 1' };
    const response = { data, status: 'saved' };
    setUpMoxios(200, response);

    await store.dispatch(addTag(response.data));
    const [firstAction] = store.getActions();
    expect(firstAction).toEqual(addTagAction(response.data));
  });

  it('removeTag', async () => {
    const data = { id: '5d16801384deb893dbd11fd8' };
    const response = { data, status: 'removed' };
    setUpMoxios(200, response);

    await store.dispatch(removeTag(response.data));
    const [firstAction] = store.getActions();
    expect(firstAction).toEqual(removeTagAction(response.data));
  });

  it('updateTag', async () => {
    const data = { id: '5d16801384deb893dbd11fd8', name: 'tutorial 2' };
    const response = { data, status: 'updated' };
    setUpMoxios(200, response);

    await store.dispatch(updateTag(response.data.id, response.data.name));
    const [firstAction] = store.getActions();
    expect(firstAction).toEqual(updateTagAction(response.data));
  });
});

function setUpMoxios(status, response) {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({ status, response });
  });
}
