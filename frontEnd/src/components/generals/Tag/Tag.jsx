import React, {useState, useRef} from 'react';
import "./Tag.css"

import Icon from '../Icon';
import {updateTag} from "../../../utils/ServerRequest";
import {useStateValueCtx} from "../../../context/Tags.contex";

function Tag(props){
    const inputEl = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const {color = "0396A6", onClose, name = ""} = props;
    /* const [dataCtx, dispatchCtx] = useStateValueCtx(); */

    function activeEdit(){
        setIsEdit(true);
    }

    function hideEdit(){
        setIsEdit(false);
    }
    
    function checkName(event){
        if(event.key == "Enter" && inputEl.current.value !== ""){
            putTag(inputEl.current.value)
        }
    }

    async function putTag(name){
        try{
            const {status, data} = await updateTag(props.id, name);
            if(status == "updated"){
                /* dispatchCtx({ type: "updateTags", id: data.id, newName: data.name}) */
            }
        }catch(error){
            console.error("error", error)
        }
    }

    return  <div className="Tag --ellipsis" style={{"background": `#${color}`}} onBlur={hideEdit}>
                <Icon name="close" onClick={onClose} className={"close"} pointer={true}/>
                {!isEdit && <span className="pointer" onDoubleClick={activeEdit}>{name}</span>}
                {isEdit && <input className="editBox" placeholder={name} ref={inputEl} autoFocus onKeyPress={checkName}/>}
            </div>

}

export default Tag;