import React, {Fragment, useState, useEffect} from 'react';

import "./SideBarOptions.css"

import Icon from "../../generals/Icon";
import CreateLink from "../../CreateLink";
import TagBox from "../../TagBox";

export default function SideBarOptions(props) {
  const { setSelectedComponent } = props;

  useEffect(() => {
    setSelectedComponent(CreateLink)
  }, []);

  return  <section className="sideBarOptions">
            <button className={false ? "--selected": ""} onClick={() => setSelectedComponent(CreateLink)}>
              <Icon name="add_circle"/>
            </button>
            <button className={false ? "--selected": ""} onClick={() => setSelectedComponent(TagBox)}>
              <Icon name="loyalty"/>
            </button>
          </section>
}

SideBarOptions.propTypes = {
}
