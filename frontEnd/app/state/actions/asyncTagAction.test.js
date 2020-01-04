import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {getAllTags, addTag, removeTag, updateTag} from './asyncTagAction';
import {TAGS_LOADED} from './actions-types';
import {addTagAction, removeTagAction, updateTagAction} from '.'

jest.mock('../../utils/ServerRequest'); 

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions', () => {
    var store;

    beforeEach(() =>{
        const initialState = {};
        store = mockStore(initialState);
    });
    
    afterEach(() => {
        store.clearActions();
    });

    it('getAllTags', () => {
        return store.dispatch(getAllTags())
            .then(() => {
                const [firstAction] = store.getActions();
                expect(firstAction.type).toBe(TAGS_LOADED);
            });
    })
    
    it('addTag', () => {
        const data = {color: "73B1BF", id: "5d16801384deb893dbd11fd8", name: "tutorial 1"}
        return store.dispatch(addTag(data))
            .then(() => {
                const [firstAction] = store.getActions();
                expect(firstAction).toEqual(addTagAction(data));
            });
    })
    
    it('removeTag', () => {
        const data = {id: "5d16801384deb893dbd11fd8"}
        return store.dispatch(removeTag(data))
            .then(() => {
                const [firstAction] = store.getActions();
                expect(firstAction).toEqual(removeTagAction(data));
            });
    })
    
    it('updateTag', () => {
        const data = {id: "5d16801384deb893dbd11fd8", name: "tutorial 2", color: "73B1BF"}
        return store.dispatch(updateTag(data))
            .then(() => {
                const [firstAction] = store.getActions();
                expect(firstAction).toEqual(updateTagAction(data));
            });
    })

})