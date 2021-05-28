import React, { useState } from 'react';

import './SideBar.css';
import SideBarOptions from './SideBarOptions';
import DynamicComponent from './DynamicComponent';

const SideBar: React.FC = () => {
  // const [switchs, setSwitchs] = useState([{ name: 'Fun', name: 'React' }]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <section className="sideBar">
      <SideBarOptions setSelectedComponent={setSelectedComponent} />
      <div className="sideBar__container">
        <DynamicComponent component={selectedComponent} />
      </div>
    </section>
  );
};

export default SideBar;
