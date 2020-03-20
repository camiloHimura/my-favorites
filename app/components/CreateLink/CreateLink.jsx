import React, {useRef, useState, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {TagPropType} from "../../propsTypes";
import "./CreateLink.css"

import Tag from "../generals/Tag";
import AutoComplete from "../generals/AutoComplete";
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
  const [tags, setTags] = useState([]);
  console.log('CreateLink props', props);

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
            tags: tags.map(tag => tag.id)
        });
        clear();
    }
  }

  function clear(){
    inputUrl.current.value = "";
    inputTitle.current.value = "";
    setTags([]);
  }

  return  <div className="createLink">
            <h2>Create Link</h2>

            <input className="createLink__contInputs__title" placeholder="Title" onFocus={removeInvalid} ref={inputTitle}/>
            <input className="createLink__contInputs__url" placeholder="Url" onFocus={removeInvalid} ref={inputUrl}/>
            <button className="createLink__send" type="button" onClick={check}>Send</button>

            <div className="createLink__contTags --flex">
              <AutoComplete 
                  autoHide={false}
                  propertyFilter="name" 
                  options={props.tags} 
                  placeHolder="Add Tags"
                  clearAfterSelecting={true}
                  onSelected={tag => setTags([{...tag}, ...tags])}/>

              <div className="contOptions">
                  {tags.map((tag, index) => <Tag key={`${index}-boardTags`} {...tag}/>)}
              </div>
            </div>
          </div>
}

CreateLink.propTypes = {
  addLink: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape(TagPropType))
}

export default connect(mapStateToProps, mapDispachToProps)(CreateLink);
