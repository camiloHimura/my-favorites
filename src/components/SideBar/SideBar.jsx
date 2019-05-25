import React, {useState, useEffect} from 'react';
import "./SideBar.css"

import Tag from "../generals/Tag";
import Switch from "../generals/Switch";
import Board from "../generals/Board";

import {useStateValueCtx} from "../../context/Tags.contex";

function SideBar() {
    const [switchs, setSwitchs] = useState([{name: "Fun", name: "React"}])
    const [dataCtx, dispatchCtx] = useStateValueCtx();

    useEffect(() => {
        setTimeout(() => {
            dispatchCtx({ type: "addTags", tags: [{name: "test1"}, {name: "test2"}] })
        }, 1000);
    }, []);

    return  <section className="sideBar">
                <div className="sideBar__container">
                    <h2 className="--filters">Filters</h2>
                    <div className="sideBar__container__options">
                        <Board
                            isWrap={true} 
                            options={switchs} 
                            Component={Switch}
                            setOptions={item => setSwitchs(prev => [item, ...prev])}
                            className="boardSwitchs"
                            placeHolder="Create Category"/>
                    </div>

                    <h2>Current Tags</h2>
                    <div className="sideBar__container__tags">
                        <Board
                            isWrap={true} 
                            options={dataCtx.tags} 
                            Component={Tag}
                            setOptions={tag => dispatchCtx({type: "addTags", tags: [tag]})}
                            className="boardTags"
                            placeHolder="Create Tag"/>
                    </div>
                </div>
            </section>

}

export default SideBar ;