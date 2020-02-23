import React, {Fragment, useState, useEffect} from 'react';

import "./SideBarOptions.css"

import Icon from "../../generals/Icon";
import CreateLink from "../../CreateLink";
import TagBox from "../../TagBox";

/* const Filters = <Fragment>
  <h2 className="--filters">Filters</h2>
    <Board
      isWrap={true} 
      options={switchs} 
      Component={Switch}
      setOptions={item => setSwitchs(prev => [item, ...prev])}
      className="boardSwitchs"
      placeHolder="Create Category"/>
</Fragment> */

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

