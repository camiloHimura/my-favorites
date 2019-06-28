import React, {useState, useEffect} from 'react';
import "./SideBar.css"

import Tag from "../generals/Tag";
import Switch from "../generals/Switch";
import Board from "../generals/Board";

import {useStateValueCtx} from "../../context/Tags.contex";
import {getTags, createTag, deleteTag} from "../../utils/ServerRequest";

function SideBar() {
    const [switchs, setSwitchs] = useState([{name: "Fun", name: "React"}])
    const [dataCtx, dispatchCtx] = useStateValueCtx();

    async function requestTags(){
        let tags = await getTags();
        dispatchCtx({ type: "addTags", tags})
    }

    async function addTag(info){
        try{
            const {status, data} = await createTag(info);
            if(status == "saved"){
                dispatchCtx({ type: "addTags", tags: [data]})
            }
        }catch(error){
            console.error("error", error)
        }
    }

    async function removeTag(id){
        try{
            const {status} = await deleteTag(id);
            if(status == "removed"){
                dispatchCtx({ type: "removeTags", id})
            }
        }catch(error){
            console.error("error", error)
        }
    }

    useEffect(() => {
        requestTags()
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
                            Component={props => <Tag {...props} onClose={() => removeTag(props.id)}/>}
                            setOptions={addTag}
                            className="boardTags"
                            placeHolder="Create Tag"/>
                    </div>
                </div>
            </section>

}

export default SideBar ;