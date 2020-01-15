import React, {useState, useRef} from 'react';
import {TagPropType} from '../../../propsTypes';
import {connect} from 'react-redux';
import "./Tag.css"

import Icon from '../Icon';
import {updateTag} from "../../../state/actions";

const mapDispachToProps = dispatch => ({
        updateTag: (id, name, color) => dispatch(updateTag(id, name, color)),
      })

export function Tag(props){
    const inputEl = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const {color = "0396A6", onClose, name = "", updateTag, id, updateDisable = false} = props;

    function activeEdit(){
      if(updateDisable){return};
      setIsEdit(true);
    }

    function hideEdit(){
      setIsEdit(false);
    }
    
    function checkName(event){
      if(event.key == "Enter" && inputEl.current.value !== ""){
          updateTag(id, inputEl.current.value, color);
      }
    }

    return  <div className="Tag --ellipsis" style={{"background": `#${color}`}} onBlur={hideEdit}>
              <Icon name="close" onClick={onClose} className={"close"} pointer={true}/>
              {!isEdit && <span className="pointer" onDoubleClick={activeEdit}>{name}</span>}
              {isEdit && <input className="editBox" placeholder={name} ref={inputEl} autoFocus onKeyPress={checkName}/>}
            </div>

}

Tag.propType = TagPropType;

export default connect(null, mapDispachToProps)(Tag);
