import {ADD_LINK, LINKS_LOADED, REMOVE_LINK} from '../actions/actions-types';
import linksReducer from './linksReducer'

function MockData(){
    return [
        {id: '123', title: "test", url: "url test", tags: [1,2,3]},
        {id: '1234', title: "test 2", url: "url test 2", tags: [1,2,3]},
        {id: '12345', title: "test 3", url: "url test 3", tags: [1,2,3]},
    ]
}

describe('Links reducer', () => {
    it('return default store', () => {
        const newState = linksReducer(undefined, {});
        expect(newState).toEqual([{id: '0', title: "test", url: "https://www.valentinog.com/blog/redux/", tags: [0]}])
    })
    
    it('reciving a ADD_LINK type', () => {
        const [newLink] = MockData();
        const newState = linksReducer(undefined, {
                                                    type: ADD_LINK, 
                                                    payload: newLink
                                                });
        expect(newState).toContain(newLink);
    })

    it('reciving a LINKS_LOADED type', () => {
        const newLinks = MockData();
        const newState = linksReducer(undefined, {
                                                    type: LINKS_LOADED, 
                                                    payload: newLinks,
                                                });
        expect(newState).toEqual(newLinks);
    })
    
    it('reciving a REMOVE_LINK type', () => {
        const newLinks = MockData();
        let state = linksReducer(undefined, {type: LINKS_LOADED, payload: newLinks});
        const [fistLink] = MockData();
        state = linksReducer(state, {
                                        type: REMOVE_LINK,
                                        payload: fistLink.id,
                                    });
        expect(state).toEqual(
            expect.not.arrayContaining([fistLink]),
        );
    })

})
