import React, { useState, useEffect } from 'react';
import * as R from 'ramda';

import Tag from '../Tag';
import AutoComplete from '../AutoComplete';
import { iTag, iTagList } from '../../../interfaces';

import './TagList.css';

type iRemoveTagHandler = (tgs: iTag[]) => (tg: iTag) => void;

const isSameTag = (sTag: iTag) => (tag: iTag) => tag.id === sTag.id;
const removeTag = (tag: iTag) => (tags: iTag[]) => R.reject(isSameTag(tag), tags);
const checkTagWith = (tag: iTag) => R.any(isSameTag(tag));

// eslint-disable-next-line react/display-name
const setUpTag = (tags: iTag[]) => (handler: iRemoveTagHandler) => (tag: iTag) =>
  <Tag key={tag.id} isUpdateDisable={true} onClose={handler(tags)} data-test="cp-tag" {...tag} />;

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
  const updateStateAndProps = R.pipe(R.tap(setSavedTags), R.tap(onTagsSaved));

  useEffect(() => {
    if (initialSavedTags.length) {
      updateStateAndProps(initialSavedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSavedTags.length]);

  useEffect(() => {
    if (clearList) {
      setSavedTags([]);
    }
  }, [clearList]);

  const handlerRemoveTag: iRemoveTagHandler = (savedTags: iTag[]) => (tag: iTag) =>
    R.pipe(removeTag(tag), updateStateAndProps)(savedTags);

  const addTags = (options: iTag[], savedTags: iTag[]) => (selectedTag: iTag) => {
    const isAnOptionAndNoExistingTag = () =>
      checkTagWith(selectedTag)(options) && !checkTagWith(selectedTag)(savedTags);

    R.when(
      isAnOptionAndNoExistingTag,
      updateStateAndProps,
    )(R.prepend({ ...selectedTag }, savedTags));
  };

  const setTapWithHandlerRemove = setUpTag(savedTags)(handlerRemoveTag);

  return (
    <div className={className}>
      <AutoComplete
        options={options}
        autoHide={autoHide}
        propertyFilter="name"
        placeHolder={placeHolder}
        data-test="cp-autocomplete"
        onSelected={addTags(options, savedTags)}
        clearAfterSelecting={clearAfterSelecting}
      />
      <div className="contOptions">{R.map(setTapWithHandlerRemove, savedTags)}</div>
    </div>
  );
};

export default TagList;
