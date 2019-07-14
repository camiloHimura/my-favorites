import React from 'react';
import {Provider} from "react-redux";
import store from "./state/store";

import './App.css';

import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Content from "./components/Content";

function App(){
    const items =   [
                        {name:"Whishlist", icon:"star"}, 
                        {name:"My Account", icon:"person"},
                        {name:"Settings", icon:"settings"},
                        {name:"Messages", icon:"mail_outline"},
                        {name:"Home", icon:"home", selected: true}, 
                    ]
    
    return (
        <Provider store={store}>
            <div className="MyFavorites">
                <Nav items={items}/>
                <SideBar/>
                <Content/>
            </div>
        </Provider>
    )
}

export default App;
