import React, {useRef, useState, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {TagPropType} from "../../propsTypes";
import LStorage from '../../utils/LStorage';
import {CREATE_LINK} from '../../contans/LStorageNames';
import "./CreateLink.css"

import TagList from "../generals/TagList";
import {addLink, invalidLink, getAllTags} from "../../state/actions";

const mapStateToProps = state => ({
  tags: state.tags,
  isInvalidLink: state.invalidLink
})

const mapDispachToProps = dispatch => ({
  addLink: info => dispatch(addLink(info)),
  invalidLink: () => dispatch(invalidLink()),
  getAllTags: () => dispatch(getAllTags()),
})

export function CreateLink(props) {
  const inputTitle = useRef();
  const inputUrl = useRef();
  const [savedTags, setSavedTags] = useState([]);
  const [initialSavedTags, setInitialSavedTags] = useState([]);
  const [clearList, setClearList] = useState(false);

  useEffect(() => {
    if(!props.tags.length){
      props.getAllTags();
    }
    if(LStorage.has(CREATE_LINK)){
      setUpLStorageLink(LStorage.get(CREATE_LINK))
    }
  }, []);

  useEffect(() => {
    updatedLS();
}, [savedTags]);

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
    setClearList(true);
    LStorage.remove(CREATE_LINK);
  }

  function setUpLStorageLink(data = {}){
    const {title, url, tags} = data;
    inputTitle.current.value = title;
    inputUrl.current.value = url;
    setInitialSavedTags(tags);
  }

  function updatedLS(){
    const title = inputTitle.current.value;
    const url = inputUrl.current.value;
    const tags = savedTags;
    LStorage.set(CREATE_LINK, {title, url, tags})
  }

  return  <div className="createLink">
            <h2>Create Link</h2>

            <input placeholder="Title" 
              ref={inputTitle} 
              data-test='inp-title'
              onChange={updatedLS}
              onFocus={removeInvalid}
              className="createLink__contInputs__title"
            />
            <div className="--flex">
              <input placeholder="Url" 
                ref={inputUrl} 
                data-test='inp-url'
                onChange={updatedLS}
                onFocus={removeInvalid} 
                className="createLink__contInputs__url"
                />
              <button className="createLink__send" type="button" onClick={check} data-test='btn-send'>Send</button>
            </div>

            <TagList
              className="createLink__contTags --flex"
              autoHide={false}
              propertyFilter="name" 
              options={props.tags} 
              data-test='cp-tagList'
              placeHolder="Add Tags"
              clearList={clearList}
              clearAfterSelecting={true}
              onTagsSaved={setSavedTags}
              initialSavedTags={initialSavedTags}
            />
          </div>
}

CreateLink.propTypes = {
  addLink: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape(TagPropType))
}

export default connect(mapStateToProps, mapDispachToProps)(CreateLink);
