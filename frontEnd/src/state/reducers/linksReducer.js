import {ADD_LINK, LINKS_LOADED, REMOVE_LINK} from "../actions/actions-types";

export default function addLinkReducer(state = [{id: 0, title: "test", url: "https://www.valentinog.com/blog/redux/", tags: [0]}], action){
    switch(action.type){
        case ADD_LINK:
            return [...state, action.payload]
        
        case LINKS_LOADED:
            return [...action.payload]
   
        case REMOVE_LINK:
            return [...state.filter(item => item.id != action.payload)]

        default: 
            return state;
    }
}