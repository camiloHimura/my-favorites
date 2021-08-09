import React, { useState, useEffect } from 'react';
import * as R from '../../../utils/R';

import Tag from '../Tag';
import AutoComplete from '../AutoComplete';
import { iTag, iTagList } from '../../../interfaces';

import './TagList.css';

type iRemoveTagHandler = (tgs: iTag[]) => (tg: iTag) => void;

const isSameTag = (sTag: iTag) => (tag: iTag) => tag.id === sTag.id;
const removeTag = (tag: iTag) => (tags: iTag[]) => R.reject(isSameTag(tag), tags);
const findTag = (tag: iTag) => R.any(isSameTag(tag));

const isAnOptionAndNotExistingTag = (options: iTag[], tags: iTag[]) => (selectedTag) =>
  findTag(selectedTag)(options) && !findTag(selectedTag)(tags);

// eslint-disable-next-line react/display-name
const setUpTag = (handler: (selectedTag: iTag) => void) => (tag: iTag) =>
  <Tag key={tag.id} isUpdateDisable={true} onClose={handler} data-test="cp-tag" {...tag} />;

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
  }, [initialSavedTags.length]);

  useEffect(() => {
    if (clearList) {
      setSavedTags([]);
    }
  }, [clearList]);

  const handlerRemoveTag: iRemoveTagHandler = (tags: iTag[]) => (tag: iTag) =>
    R.pipe(removeTag(tag), updateStateAndProps)(tags);

  const addTags = (options: iTag[], tags: iTag[]) =>
    R.when(isAnOptionAndNotExistingTag(options, tags), (tag: iTag) =>
      updateStateAndProps(R.prepend({ ...tag }, tags)),
    );

  const tapWithRemoveHandler = (tags: iTag[]) => setUpTag(handlerRemoveTag(tags));

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
      <div className="contOptions">{R.map(tapWithRemoveHandler(savedTags), savedTags)}</div>
    </div>
  );
};

export default TagList;
