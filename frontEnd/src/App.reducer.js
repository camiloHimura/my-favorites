export default function reducer(state, action){
    switch(action.type){
        case "addTags":
            return {...state, tags: [...action.tags, ...state.tags]}
        case "removeTags":
                let finalTags = state.tags.filter(({id}) => id != action.id);
            return {...state, tags: finalTags}
        case "updateTags":
                let updatedTags = state.tags.map(data => {
                    return data.id != action.id? data : {...data, name: action.newName}
                });
            return {...state, tags: updatedTags}


        case "addLinks":
            return {...state, links: [...action.links, ...state.links]}
        

        case "switchLoading":
            return {...state, loading: !state.loading}

        default: 
            return state;
    }
}