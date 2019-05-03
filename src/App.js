import React from 'react';
import './App.css';
import SideBar from "./components/SideBar/SideBar"
import Content from "./components/Content/Content"

function App() {
  return (
    <div className="MyFavorites">
        <SideBar/>
        <Content/>
    </div>
  );
}

export default App;
