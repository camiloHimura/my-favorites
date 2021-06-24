import React, { useState } from 'react';

import './SideBar.css';
import TagBox from '../TagBox';
import ErrorLog from './ErrorLog';
import CreateLink from '../CreateLink';
import SideBarOptions from './SideBarOptions';
import DynamicComponent from './DynamicComponent';
//Todo add test
export interface iComponentOpt {
  icon: string;
  component: React.FC;
}

const options: iComponentOpt[] = [
  { icon: 'add_circle', component: CreateLink },
  { icon: 'loyalty', component: TagBox },
  { icon: 'notification_important', component: ErrorLog },
];

const SideBar: React.FC = () => {
  // const [switchs, setSwitchs] = useState([{ name: 'Fun', name: 'React' }]);
  const [selectedComponent, setSelectedComponent] = useState(0);

  return (
    <section className="sideBar">
      <SideBarOptions options={options} setSelectedComponent={setSelectedComponent} />
      <div className="sideBar__container">
        <DynamicComponent component={options[selectedComponent].component} />
      </div>
    </section>
  );
};

export default SideBar;
