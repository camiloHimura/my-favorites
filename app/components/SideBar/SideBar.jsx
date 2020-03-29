import React, {useState} from 'react';

import "./SideBar.css"
import SideBarOptions from "./SideBarOptions";

export default function SideBar(props) {
  const [switchs, setSwitchs] = useState([{name: "Fun", name: "React"}])
  const [SelectedComponent, setSelectedComponent] = useState(null)

  return  <section className="sideBar">
            <SideBarOptions setSelectedComponent={setSelectedComponent}/>
            <div className="sideBar__container">
              {SelectedComponent && <SelectedComponent/>}
            </div>
          </section>
}
