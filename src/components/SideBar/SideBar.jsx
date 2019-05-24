import React, {useState} from 'react';
import "./SideBar.css"

import Tag from "../generals/Tag";
import Switch from "../generals/Switch";
import Board from "../generals/Board";

function SideBar() {
    const [switchs, setSwitchs] = useState([{name: "Fun", name: "React"}])
    const [tags, setTags] = useState([])

    return  <section className="sideBar">
                <div className="sideBar__container">
                    <h2 className="--filters">Filters</h2>
                    <div className="sideBar__container__options">
                        <Board
                            isWrap={true} 
                            options={switchs} 
                            Component={Switch}
                            setOptions={setSwitchs}
                            className="boardSwitchs"
                            placeHolder="Create Tag"/>
                    </div>

                    <h2>Current Tags</h2>
                    <div className="sideBar__container__tags">
                        <Board
                            isWrap={true} 
                            options={tags} 
                            Component={Tag}
                            setOptions={setTags}
                            className="boardTags"
                            placeHolder="Create Tag"/>
                    </div>
                </div>
            </section>

}

export default SideBar ;