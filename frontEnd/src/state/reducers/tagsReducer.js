import {ADD_TAG, REMOVE_TAG, TAGS_LOADED} from "../actions/actions-types";

export default function tagsReducer(state = [{id: 0, name: "test Tag", color: "ffff"}], action){
    switch(action.type){
        case TAGS_LOADED:
            return [...action.payload]

        case ADD_TAG:
            return [...state, action.payload]
        
        case REMOVE_TAG:
            return [...state.filter(item => item.id != action.payload)]
        
        default: 
            return state;
    }
}