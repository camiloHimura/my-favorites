import React, {useRef, useState} from 'react'; 
import "./CreateLink.css"
import Board from "../generals/Board";
import Tag from "../generals/Tag";

import {useStateValueCtx} from "../../context/Tags.contex";

function CreateLink() {
    const inputTitle = useRef();
    const inputUrl = useRef();
    const [tags, setTags] = useState([]);
    const [dataCtx, dispatch] = useStateValueCtx();

    function removeInvalid(event){
        event.target.classList.remove("invalid");
    }

    function check() {
        if(inputTitle.current.value == ""){
            inputTitle.current.classList.add("invalid")
        }

        if(inputUrl.current.value == ""){
            inputUrl.current.classList.add("invalid");
        }
        console.log(inputTitle.current.value, inputUrl.current.value, "tags", tags)
    }

    console.log("create link", dataCtx)
    return  <div className="createLink --flex --wrap">
                <div className="createLink__contInputs --flex">
                    <input placeholder="Title" onFocus={removeInvalid} ref={inputTitle}/>
                    <input placeholder="Url" onFocus={removeInvalid} ref={inputUrl}/>
                </div>
                <button type="button" onClick={check}>Send</button>
                <Board 
                    options={tags} 
                    Component={Tag}
                    setOptions={setTags}
                    className="boardTags"
                    placeHolder="Add Tags"/>
            </div>
}

export default CreateLink;
