import React, {useState, useRef} from 'react';
import Tag from '../Tag';
import AutoComplete from '../AutoComplete';

import './TagList.css';

export default function TagList(props) {
  const {className, autoHide = true, tags = [], placeHolder, clearAfterSelecting = true, savedTags, setSavedTags} = props;

  function onClose(info) {
    console.log('closing for TagList', info)
  }
  
  function addTags(selectedTag) {
    const newTags = [{...selectedTag}, ...savedTags];
    setSavedTags(newTags);
  }


  return  <div className={className}>
            <AutoComplete 
                autoHide={autoHide}
                propertyFilter="name" 
                options={tags} 
                placeHolder={placeHolder}
                clearAfterSelecting={clearAfterSelecting}
                onSelected={addTags}/>

            <div className="contOptions">
                {savedTags.map((tag, index) => <Tag key={`${index}-boardTags`} onClose={onClose} {...tag}/>)}
            </div>
          </div>
}

