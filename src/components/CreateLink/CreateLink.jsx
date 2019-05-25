import React, {useRef, useState} from 'react'; 
import "./CreateLink.css"

import Tag from "../generals/Tag";
import AutoComplete from "../generals/AutoComplete";

import {useStateValueCtx} from "../../context/Tags.contex";
import Colors from "../../utils/Colors";

function CreateLink() {
    const inputTitle = useRef();
    const inputUrl = useRef();
    const [tags, setTags] = useState([]);
    const [dataCtx, dispatchCtx] = useStateValueCtx();

    function removeInvalid(event){
        event.target.classList.remove("invalid");
    }

    function check() {
        let isValid = true;
        if(inputTitle.current.value === ""){
            inputTitle.current.classList.add("invalid")
            isValid = false;
        }
        
        if(inputUrl.current.value === ""){
            inputUrl.current.classList.add("invalid")
            isValid = false;
        }

        if(isValid){
            let links = [{title: inputTitle.current.value, url: inputUrl.current.value, tags}];
            dispatchCtx({ type: "addLinks", links});
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
                        options={dataCtx.tags} 
                        placeHolder="Add Tags"
                        clearAfterSelecting={true}
                        onSelected={tag => setTags([{...tag, color: Colors.getRamdom()}, ...tags])}/>

                    <div className="contOptions">
                        {tags.map((tag, index) => <Tag key={`${index}-boardTags`} {...tag}/>)}
                    </div>
                </div>
            </div>
}

export default CreateLink;
