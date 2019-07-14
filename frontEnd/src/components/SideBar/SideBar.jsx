import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";

import "./SideBar.css"

import Tag from "../generals/Tag";
import Switch from "../generals/Switch";
import Board from "../generals/Board";

import {addTagAction} from "../../state/actions";
import {getAllTags, addTag, removeTag} from "../../state/actions/asyncTagAction";

const mapStateToProps = state => {
    return {
            tags: state.tags, 
            invalidTag: state.validation.invalidTag
        }            
}

const mapDispachToProps = dispatch => {
    return {
        addTag: info => dispatch(addTag(info)),
        removeTag: id => dispatch(removeTag(id)),
        getAllTags: () => dispatch(getAllTags()),
        addTagAction: tag => dispatch(addTagAction(tag)),
    }
}

function SideBar(props) {
    const [switchs, setSwitchs] = useState([{name: "Fun", name: "React"}])

    useEffect(() => {
        props.getAllTags();
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
                            Component={internalProps => <Tag {...internalProps} onClose={() => props.removeTag(internalProps.id)}/>}
                            setOptions={info => props.addTag(info)}
                            className="boardTags"
                            placeHolder="Create Tag"/>
                        {/*props.invalidTag && "Type a valid Tag"*/}
                    </div>
                </div>
            </section>

}

export default connect(mapStateToProps, mapDispachToProps)(SideBar);