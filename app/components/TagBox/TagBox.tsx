import React, { Dispatch, useEffect } from 'react';

import './TagBox.css';

import Tag from '../generals/Tag';
import Board from '../generals/Board';
import {
  getAllTagsAsyncAction,
  addTagAsyncAction,
  removeTagAsyncAction,
} from '../../state/actions';
import { RootState } from '../../state/store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { iTag } from '../../interfaces';

const selectTags = (state: RootState) => state?.tags;
const selectInvalidTag = (state: RootState) => state?.validation?.invalidTag;

const TagBox: React.FC = () => {
  const tags = useAppSelector(selectTags);
  const invalidTag = useAppSelector(selectInvalidTag);

  const dispatchAddTag: Dispatch<any> = useAppDispatch();
  const dispatchRemoveTag: Dispatch<any> = useAppDispatch();
  const dispatchGetAllTags: Dispatch<any> = useAppDispatch();
  const addTag = (tag: iTag) => dispatchAddTag(addTagAsyncAction(tag));
  const getAllTags = () => dispatchGetAllTags(getAllTagsAsyncAction());
  const removeTag = (id: string) => dispatchRemoveTag(removeTagAsyncAction(id));

  useEffect(() => {
    if (!tags.length) {
      getAllTags();
    }
  }, []);

  return (
    <section className="TagBox">
      <h2 className="title">Current Tags</h2>
      <div className="TagBox__container__tags">
        <Board
          isWrap={true}
          options={tags}
          className="boardTags"
          setOptions={addTag}
          placeHolder="Create Tag"
          Component={(internalProps) => (
            <Tag
              {...internalProps}
              onClose={() => {
                removeTag(internalProps.id as string);
              }}
            />
          )}
        />
        {invalidTag && <div data-test="invalid-tag"></div>}
      </div>
    </section>
  );
};

export default TagBox;
