import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {getAllLinks, addLink} from './asyncLinkAction';
import {LINKS_LOADED} from '../actions/actions-types';
import {addLinkAction} from '../actions'

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

    it('getAllLinks', () => {
        return store.dispatch(getAllLinks())
            .then(() => {
                const [firstAction] = store.getActions();
                expect(firstAction.type).toBe(LINKS_LOADED);
            });
    })
    
    it('addLink', () => {
        const data = {id: '1991', title: "test", url: "url test", tags: [4,3,2,1]}
        return store.dispatch(addLink(data))
            .then(() => {
                const [firstAction] = store.getActions();
                expect(firstAction).toEqual(addLinkAction(data));
            });
    })

})