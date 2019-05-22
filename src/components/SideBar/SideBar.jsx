import React from 'react';
import "./SideBar.css"

import Tag from "../Tag";
import Switch from "../Switch";

class SideBar  extends React.Component{
    state = {
        options: ["wb_cloudy", "calendar_today", "favorite"]
    }

    render(){
        return  <section className="sideBar">
                    <div className="logo"></div>
                    <div className="sideBar__container">
                        <h2 className="--filters">Filters</h2>
                        <div className="sideBar__container__options">
                            {this.state.options.map((icon, index) => <Switch key={`${index}-icon`} name="test"/>)}
                        </div>

                        <h2>Tags</h2>
                        <div className="sideBar__container__tags">
                            <Tag name="Tutorial"/>
                            <Tag name="Blog"/>
                            <Tag name="VideoTutorial"/>
                        </div>
                    </div>
                </section>
    }
}

export default SideBar ;