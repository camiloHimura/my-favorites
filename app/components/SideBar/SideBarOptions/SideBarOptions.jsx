import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";

import "./SideBarOptions.css"
import {setSideBarIndex, setSideBarErrorIndex} from"../../../state/actions"

import Icon from "../../generals/Icon";
import CreateLink from "../../CreateLink";
import TagBox from "../../TagBox";
import ErrorLog from "../ErrorLog";

const options = [
  {icon: 'add_circle', component: CreateLink},
  {icon: 'loyalty', component: TagBox},
  {icon: 'notification_important', component: ErrorLog}
]

const mapStateToProps = state => ({
  sideBar: state.sideBar
});

const mapDispachToProps = dispatch => ({
  setSideBarIndex: info => dispatch(setSideBarIndex(info)),
  setSideBarErrorIndex: info => dispatch(setSideBarErrorIndex(info)),
})

export function SideBarOptions(props) {
  const { sideBar, setSelectedComponent, setSideBarIndex, setSideBarErrorIndex } = props;
  
  useEffect(() => {
    setSideBarErrorIndex(2);
  }, []);

  useEffect(() => {
    setSelectedComponent(options[sideBar.activeIndex].component)
  }, [sideBar.activeIndex]);

  return  <section className="sideBarOptions">
            {options.map(({icon}, index) => 
              <button key={`options-${index}`} 
                className={`--flex ${sideBar.activeIndex == index ? "--selected": ""}`} 
                onClick={() => {setSideBarIndex(index)}}>
                  <Icon name={icon}/>
              </button>
            )}
          </section>
}

SideBarOptions.propTypes = {
}

export default connect(mapStateToProps, mapDispachToProps)(SideBarOptions);