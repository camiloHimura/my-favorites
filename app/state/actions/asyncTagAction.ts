import { Dispatch } from 'react';
import { iAction, iError } from '../../interfaces';
import { getTags, createTag, deleteTag, updateTagRequest } from '../../utils/ServerRequest';
import {
  tagsLoadedAction,
  addTagAction,
  removeTagAction,
  updateTagAction,
  addErrorAction,
} from './index';

export const getAllTagsAsyncAction = () => async (dispatch: Dispatch<iAction<boolean | iError>>) => {
  try {
    const tags = await getTags();
    dispatch(tagsLoadedAction(tags));
  } catch (error) {
    dispatch(addErrorAction({ ...error }));
  }
}

export function addTag(info) {
  return async function (dispatch) {
    try {
      const { status, data } = await createTag(info);
      if (status == 'saved') {
        dispatch(addTagAction(data));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
}

export function removeTag(id) {
  return async function (dispatch) {
    try {
      const { status } = await deleteTag(id);
      if (status == 'removed') {
        dispatch(removeTagAction(id));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
}

export function updateTag(id: string, name: string) {
  return async function (dispatch) {
    try {
      const { status, data } = await updateTagRequest(id, name);
      if (status == 'updated') {
        dispatch(updateTagAction(data));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
}
