import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {TagPropType} from "../../propsTypes";

import "./TagBox.css"

import Tag from "../generals/Tag";
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

export function TagBox(props) {
  useEffect(() => {
    if(!props.tags.length){
      props.getAllTags();
    }
  }, []);

  return  <section className="TagBox">
            <h2>Current Tags</h2>
              <div className="TagBox__container__tags">
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
          </section>
}

TagBox.propTypes = {
  invalidTag: PropTypes.bool,
  removeTag: PropTypes.func,
  addTag: PropTypes.func,
  getAllTags: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape(TagPropType)),
}

export default connect(mapStateToProps, mapDispachToProps)(TagBox);
