import React from 'react';
import {Provider} from "react-redux";
import store from "./state/store";

import './App.css';

import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Content from "./components/Content";

function App(){
    const items = [{name:"Home", icon:"home", selected: true}, {name:"Messages", icon:"mail_outline"},
                    {name:"Whishlist", icon:"star"}, {name:"Settings", icon:"settings"},
                    {name:"My Account", icon:"person"}]
    
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
