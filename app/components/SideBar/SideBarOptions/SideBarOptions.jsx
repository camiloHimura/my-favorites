import React, { useState, useEffect } from 'react';

import "./SideBarOptions.css"

import Icon from "../../generals/Icon";
import CreateLink from "../../CreateLink";
import TagBox from "../../TagBox";
import ErrorLog from "../ErrorLog";

const options = [
  {index: 0, icon: 'add_circle', component: CreateLink},
  {index: 1, icon: 'loyalty', component: TagBox},
  {index: 2, icon: 'notification_important', component: ErrorLog}
]
export default function SideBarOptions(props) {
  const [ISelected, setIndex] = useState(0)

  const { setSelectedComponent } = props;

  useEffect(() => {
    updatedSlection(2)
    setSelectedComponent(ErrorLog)
  }, []);

  function updatedSlection(index){
    setIndex(index)
  }

  return  <section className="sideBarOptions">
            {options.map(({index, icon, component}) => 
              <button key={`options-${index}`} 
                className={`--flex ${ISelected == index ? "--selected": ""}`} 
                onClick={() => {updatedSlection(index); setSelectedComponent(component)}}>
                  <Icon name={icon}/>
              </button>
            )}
          </section>
}

SideBarOptions.propTypes = {
}
