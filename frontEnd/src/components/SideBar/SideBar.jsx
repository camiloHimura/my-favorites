import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";

import "./SideBar.css"

import Tag from "../generals/Tag";
import Switch from "../generals/Switch";
import Board from "../generals/Board";

import {getTags, createTag, deleteTag} from "../../utils/ServerRequest";
import {addTagAction, removeTagAction} from "../../state/actions";

const mapStateToProps = state => {
    return {tags: state.tags, invalidTag: state.validation.invalidTag}
}

const mapDispachToProps = dispatch => {
    return {
        addTagAction: tag => dispatch(addTagAction(tag)),
        removeTagAction: id => dispatch(removeTagAction(id)),
    }
}

function SideBar(props) {
    const [switchs, setSwitchs] = useState([{name: "Fun", name: "React"}])
    /*const [dataCtx, dispatchCtx] = useStateValueCtx(); */

    async function requestTags(){
        let tags = await getTags();
        /* dispatchCtx({ type: "addTags", tags}) */
    }

    async function addTag(info){
        try{
            const {status, data} = await createTag(info);
            if(status == "saved"){
                props.addTagAction(data);
            }
        }catch(error){
            console.error("error", error)
        }
    }

    async function removeTag(id){
        try{
            const {status} = await deleteTag(id);
            if(status == "removed"){
                props.removeTagAction(id);
            }
        }catch(error){
            console.error("error", error)
        }
    }

    useEffect(() => {
        //requestTags()
        console.log("props", props)
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
                            options={props.tags} 
                            Component={props => <Tag {...props} onClose={() => removeTag(props.id)}/>}
                            setOptions={addTag}
                            className="boardTags"
                            placeHolder="Create Tag"/>
                        {/*props.invalidTag && "Type a valid Tag"*/}
                    </div>
                </div>
            </section>

}

export default connect(mapStateToProps, mapDispachToProps)(SideBar) ;