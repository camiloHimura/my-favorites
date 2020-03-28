import React, {useRef, useState, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {TagPropType} from "../../propsTypes";
import "./CreateLink.css"

import TagList from "../generals/TagList";
import {addLink, invalidLink, getAllTags} from "../../state/actions";

const mapStateToProps = state => {
  return {
    tags: state.tags,
    isInvalidLink: state.invalidLink
  }
}

const mapDispachToProps = dispatch => {
  return {
    addLink: info => dispatch(addLink(info)),
    invalidLink: () => dispatch(invalidLink()),
    getAllTags: () => dispatch(getAllTags()),
  }
}

export function CreateLink(props) {
  const inputTitle = useRef();
  const inputUrl = useRef();
  const [savedTags, setSavedTags] = useState([]);
  const [clearList, setClearList] = useState(false);

  useEffect(() => {
    if(!props.tags.length){
      props.getAllTags();
    }
  }, []);

  function removeInvalid(event){
    event.target.classList.remove("invalid");
  }

  function check() {
    let isValid = true;
    if(inputTitle.current.value === "") {
      inputTitle.current.classList.add("invalid")
      isValid = false;
    }
    
    if(inputUrl.current.value === "") {
      inputUrl.current.classList.add("invalid")
      isValid = false;
    }

    if(isValid){
        props.addLink({
            title: inputTitle.current.value,
            url: inputUrl.current.value, 
            tags: savedTags.map(tag => tag.id)
        });
        clear();
    }
  }

  function clear(){
    inputUrl.current.value = "";
    inputTitle.current.value = "";
    setClearList(true)
  }

  return  <div className="createLink">
            <h2>Create Link</h2>

            <input className="createLink__contInputs__title" placeholder="Title" onFocus={removeInvalid} ref={inputTitle} data-test='inp-title'/>
            <input className="createLink__contInputs__url" placeholder="Url" onFocus={removeInvalid} ref={inputUrl} data-test='inp-url'/>
            <button className="createLink__send" type="button" onClick={check} data-test='btn-send'>Send</button>

            <TagList
              className="createLink__contTags --flex"
              autoHide={false}
              propertyFilter="name" 
              tags={props.tags} 
              data-test='cp-tagList'
              placeHolder="Add Tags"
              clearAfterSelecting={true}
              onTagsSaved={setSavedTags}
              clearList={clearList}
            />
          </div>
}

CreateLink.propTypes = {
  addLink: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape(TagPropType))
}

export default connect(mapStateToProps, mapDispachToProps)(CreateLink);
