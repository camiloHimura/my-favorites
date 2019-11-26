import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {TagPropType} from "../../propsTypes";
import {connect} from "react-redux";

import "./SideBar.css"

import Tag from "../generals/Tag";
import Switch from "../generals/Switch";
import Board from "../generals/Board";

import {getAllTags, addTag, removeTag} from "../../state/actions";

const mapStateToProps = state => ({
        tags: state.tags, 
        invalidTag: state.validation.invalidTag
      })

const mapDispachToProps = dispatch => ({
        addTag: info => dispatch(addTag(info)),
        removeTag: id => dispatch(removeTag(id)),
        getAllTags: () => dispatch(getAllTags()),
      })

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
                          className="boardTags"
                          setOptions={props.addTag}
                          placeHolder="Create Tag"
                          Component={internalProps => <Tag {...internalProps} onClose={() => props.removeTag(internalProps.id)}/>}
                        />
                        {/*props.invalidTag && "Type a valid Tag"*/}
                    </div>
                </div>
            </section>
}

SideBar.propTypes = {
    invalidTag: PropTypes.bool,
    removeTag: PropTypes.func,
    addTag: PropTypes.func,
    getAllTags: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagPropType)),
}

export default connect(mapStateToProps, mapDispachToProps)(SideBar);
