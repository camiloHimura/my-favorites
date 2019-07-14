import {ADD_LINK} from "../actions/actions-types";

export default function addLinkReducer(state = [{id: 0, title: "test", url: "https://www.valentinog.com/blog/redux/", tags: [0]}], action){
    switch(action.type){
        case ADD_LINK:
            return [...state, ...action.payload]

        default: 
            return state;
    }
}