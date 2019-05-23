import React from 'react';
import './App.css';

import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import TagsContex from "./context/Tags.contex";

class App extends React.Component{

    state = {}
    componentDidMount(){

    }

    render(){
        const items = [{name:"Home", icon:"home", selected: true}, {name:"Messages", icon:"mail_outline"},
                      {name:"Whishlist", icon:"star"}, {name:"Settings", icon:"settings"},
                      {name:"My Account", icon:"person"}]
                      
        return (
            <React.Fragment>
                <div className="MyFavorites">
                    <Nav items={items}/>
                    <SideBar/>
                    <Content/>
                </div>
            </React.Fragment>
        )
    }
}

export default App;
