import React, { useState, useEffect } from 'react';
import Tag from '../Tag';
import AutoComplete from '../AutoComplete';
import { iTag, iTagList } from '../../../interfaces';

import './TagList.css';

const TagList: React.FC<iTagList> = ({
  className,
  autoHide = true,
  options = [],
  placeHolder,
  clearAfterSelecting = true,
  clearList = false,
  onTagsSaved,
  initialSavedTags = [],
}: iTagList) => {
  const [savedTags, setSavedTags] = useState<iTag[]>(initialSavedTags);

  useEffect(() => {
    if (initialSavedTags.length) {
      setSavedTags(initialSavedTags);
      onTagsSaved(initialSavedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSavedTags.length]);

  useEffect(() => {
    if (clearList) {
      setSavedTags([]);
    }
  }, [clearList]);

  function removeTag(tag) {
    const filteredTags = savedTags.filter(({ id }) => id !== tag.id);
    setSavedTags(filteredTags);
    onTagsSaved(filteredTags);
  }

  function addTags(selectedTag) {
    if (!isValidTag(selectedTag)) {
      return;
    }

    if (hasTag(savedTags, selectedTag)) {
      return;
    }

    const newTags: iTag[] = [{ ...selectedTag }, ...savedTags];
    setSavedTags(newTags);
    onTagsSaved(newTags);
  }

  function isValidTag(tag) {
    if (tag === null || typeof tag !== 'object') {
      return false;
    }

    return options.some((option) => option.id === tag.id);
  }

  function hasTag(container, tag) {
    return container.some((sTag) => sTag.id === tag.id);
  }

  return (
    <div className={className}>
      <AutoComplete
        options={options}
        autoHide={autoHide}
        onSelected={addTags}
        propertyFilter="name"
        data-test="cp-autocomplete"
        placeHolder={placeHolder}
        clearAfterSelecting={clearAfterSelecting}
      />

      <div className="contOptions">
        {savedTags.map((tag, index) => (
          <Tag
            key={`${index}-boardTags`}
            isUpdateDisable={true}
            onClose={removeTag}
            {...tag}
            data-test="cp-tag"
          />
        ))}
      </div>
    </div>
  );
};

export default TagList;
