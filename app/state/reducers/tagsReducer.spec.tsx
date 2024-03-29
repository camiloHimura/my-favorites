import { addTagAction, tagsLoadedAction, removeTagAction, updateTagAction } from '../actions';
import tagsReducer from './tagsReducer';

const mockData = [
  { id: '1', name: 'test Tag 1', color: 'ffff' },
  { id: '2', name: 'test Tag 2', color: 'ffff' },
  { id: '3', name: 'test Tag 3', color: 'ffff' },
];

describe('Tag reducer', () => {
  it('return default store', () => {
    const newState = tagsReducer(undefined, {} as any);
    expect(newState).toEqual([]);
  });

  it('receiving a ADD_LINK type', () => {
    const [newTag] = mockData;
    const newState = tagsReducer(undefined, addTagAction(newTag));
    expect(newState).toContain(newTag);
  });

  it('receiving a TAGS_LOADED type', () => {
    const newTags = mockData;
    const newState = tagsReducer(undefined, tagsLoadedAction(newTags));
    expect(newState).toEqual(newTags);
  });

  it('receiving a REMOVE_TAG type', () => {
    const newTags = mockData;
    const [firstTag] = mockData;
    const state = tagsReducer(newTags, removeTagAction(firstTag.id));
    expect(state).toEqual(expect.not.arrayContaining([firstTag]));
  });

  it('receiving a UPADTED_TAG type', () => {
    const newTags = mockData;
    const updatedTag = { id: '1', name: 'test Tag 1.1', color: '0000' };
    const state = tagsReducer(newTags, updateTagAction(updatedTag));
    expect(state).toContainEqual(updatedTag);
  });
});
