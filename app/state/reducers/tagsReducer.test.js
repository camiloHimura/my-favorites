import {addTagAction, tagsLoadedAction, removeTagAction, updateTagAction} from '../actions';
import tagsReducer from './tagsReducer'

function MockData(){
  return [
    {id: '1', name: "test Tag 1", color: "ffff"},
    {id: '2', name: "test Tag 2", color: "ffff"},
    {id: '3', name: "test Tag 3", color: "ffff"},
  ]
}

describe('Tag reducer', () => {
  it('return default store', () => {
    const newState = tagsReducer(undefined, {});
    expect(newState).toEqual([]);
  })
  
  it('reciving a ADD_LINK type', () => {
    const [newTag] = MockData();
    const newState = tagsReducer(undefined, addTagAction(newTag));
    expect(newState).toContain(newTag);
  })

  it('reciving a TAGS_LOADED type', () => {
    const newTags = MockData();
    const newState = tagsReducer(undefined, tagsLoadedAction(newTags));
    expect(newState).toEqual(newTags);
  })
  
  it('reciving a REMOVE_TAG type', () => {
    const newTags = MockData();
    const [firstTag] = MockData();
    const state = tagsReducer(newTags, removeTagAction(firstTag.id));
    expect(state).toEqual(
        expect.not.arrayContaining([firstTag]),
    );
  })
  it('reciving a UPADTED_TAG type', () => {
    const newTags = MockData();
    const updatedTag = {id: '1', name: "test Tag 1.1", color: "0000"};
    const state = tagsReducer(newTags, updateTagAction(updatedTag));
    expect(state).toContainEqual(updatedTag);
  })

})
