import React, {useReducer, useEffect} from 'react';
import './App.css';

import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import {StateProvider} from "./context/Tags.contex";
import appReducer from "./App.reducer.js";

function App(){
    const [state] = useReducer(appReducer, {tags: [], links: []});

    const items = [{name:"Home", icon:"home", selected: true}, {name:"Messages", icon:"mail_outline"},
                    {name:"Whishlist", icon:"star"}, {name:"Settings", icon:"settings"},
                    {name:"My Account", icon:"person"}]
    
    return (
        <StateProvider initialState={state} reducer={appReducer}>
            <div className="MyFavorites">
                <Nav items={items}/>
                <SideBar/>
                <Content/>
            </div>
        </StateProvider>
    )
}

export default App;
