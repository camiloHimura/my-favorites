import React, { useState, useEffect } from 'react';

import "./SideBarOptions.css"

import Icon from "../../generals/Icon";
import CreateLink from "../../CreateLink";
import TagBox from "../../TagBox";

export default function SideBarOptions(props) {
  const [ISelected, setIndex] = useState(0)

  const { setSelectedComponent } = props;

  useEffect(() => {
    setSelectedComponent(CreateLink)
  }, []);

  function updatedSlection(index){
    setIndex(index)
  }

  return  <section className="sideBarOptions">
            <button className={`--flex ${ISelected == 0 ? "--selected": ""}`} onClick={() => {updatedSlection(0); setSelectedComponent(CreateLink)}}>
              <Icon name="add_circle"/>
            </button>
            <button className={`--flex ${ISelected == 1 ? "--selected": ""}`} onClick={() => {updatedSlection(1); setSelectedComponent(TagBox)}}>
              <Icon name="loyalty"/>
            </button>
          </section>
}

SideBarOptions.propTypes = {
}
