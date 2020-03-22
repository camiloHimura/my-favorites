import React, {useState, useEffect} from 'react';
import Tag from '../Tag';
import AutoComplete from '../AutoComplete';
import PropTypes from 'prop-types';

import './TagList.css';

function TagList(props) {
  const [savedTags, setSavedTags] = useState([])
  const {className, autoHide = true, tags = [], placeHolder, clearAfterSelecting = true, clearList = false, onTagsSaved} = props;

  useEffect(() => {
    if(clearList){
      setSavedTags([]);
    }
  }, [clearList])

  function onClose(info) {
    console.log('closing for TagList', info)
  }
  
  function addTags(selectedTag) {
    const newTags = [{...selectedTag}, ...savedTags];
    setSavedTags(newTags);
    onTagsSaved(newTags);
  }


  return  <div className={className}>
            <AutoComplete 
              options={tags}
              autoHide={autoHide}
              onSelected={addTags}
              propertyFilter="name"
              placeHolder={placeHolder}
              clearAfterSelecting={clearAfterSelecting}
            />

            <div className="contOptions">
                {savedTags.map((tag, index) => <Tag key={`${index}-boardTags`} updateDisable={true} onClose={onClose} {...tag}/>)}
            </div>
          </div>
}

TagList.propTypes = {
  className: PropTypes.string,
  autoHide: PropTypes.bool,
  tags: PropTypes.array,
  placeHolder: PropTypes.string,
  clearAfterSelecting: PropTypes.bool,
  clearList: PropTypes.bool,
  onTagsSaved: PropTypes.func,
}

export default TagList;
