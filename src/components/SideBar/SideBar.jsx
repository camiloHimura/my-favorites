import React from 'react';
import "./SideBar.css"

import Search from "../Search/Search";
import Switch from "../Switch/Switch";

class SideBar  extends React.Component{
    state = {
        options: ["wb_cloudy", "calendar_today", "favorite"]
    }

    render(){
        return  <section className="sideBar">
                    <div className="logo"></div>
                    <div className="sideBar__container">
                        <h2 className="--filters">Smart Filters</h2>
                        <div className="sideBar__container__options">
                            {this.state.options.map((icon, index) => <Switch key={`${index}-icon`} icon={icon}/>)}
                        </div>

                        <h2>Status</h2>
                        <Search/>

                        <div className="sideBar__container__status">DELIVERED</div>
                    </div>
                </section>
    }
}

export default SideBar ;