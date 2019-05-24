import React, {useReducer, useEffect} from 'react';
import './App.css';

import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import TagsContex from "./context/Tags.contex";

function reducer(state, action){
    switch(action.type){
        case "switchLoading":
            return {...state, loading: !state.loading}
        case "addTags":
            return {...state, tags: [action.tags, ...state.tags]}
    }
}

function App(){
    const [state, dispatch] = useReducer(reducer, {loading: true, tags: []});

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: "switchLoading" })
            dispatch({ type: "addTags", tags: ["test1", "test2"] })
        }, 1000);
    }, []);

    const items = [{name:"Home", icon:"home", selected: true}, {name:"Messages", icon:"mail_outline"},
                    {name:"Whishlist", icon:"star"}, {name:"Settings", icon:"settings"},
                    {name:"My Account", icon:"person"}]
    
    if(state.loading){
        return <div>Loading</div>
    }

    return (
        <TagsContex.Provider value={state}>
            <div className="MyFavorites">
                <Nav items={items}/>
                <SideBar/>
                <Content/>
            </div>
        </TagsContex.Provider>
    )
}

export default App;
