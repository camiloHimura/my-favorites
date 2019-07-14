import React, {useRef, useState} from 'react';
import {connect} from "react-redux";
import "./CreateLink.css"

import Tag from "../generals/Tag";
import AutoComplete from "../generals/AutoComplete";
import {addLink, invalidLink} from "../../state/actions";

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
    }
}

function CreateLink(props) {
    const inputTitle = useRef();
    const inputUrl = useRef();
    const [tags, setTags] = useState([]);

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

    return  <div className="createLink --flex --wrap">
                <div className="createLink__contInputs --flex">
                    <input placeholder="Title" onFocus={removeInvalid} ref={inputTitle}/>
                    <input placeholder="Url" onFocus={removeInvalid} ref={inputUrl}/>
                </div>
                <button type="button" onClick={check}>Send</button>

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

export default connect(mapStateToProps, mapDispachToProps)(CreateLink);
