import React, {useReducer, useEffect} from 'react';
import './App.css';

import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import {StateProvider} from "./context/Tags.contex";

function reducer(state, action){
    switch(action.type){
        case "switchLoading":
            return {...state, loading: !state.loading}
        case "addTags":
            return {...state, tags: [...action.tags, ...state.tags]}
    }
}

function App(){
    const [state, dispatch] = useReducer(reducer, {tags: []});

    const items = [{name:"Home", icon:"home", selected: true}, {name:"Messages", icon:"mail_outline"},
                    {name:"Whishlist", icon:"star"}, {name:"Settings", icon:"settings"},
                    {name:"My Account", icon:"person"}]
    
    return (
        <StateProvider initialState={state} reducer={reducer}>
            <div className="MyFavorites">
                <Nav items={items}/>
                <SideBar/>
                <Content/>
            </div>
        </StateProvider>
    )
}

export default App;
