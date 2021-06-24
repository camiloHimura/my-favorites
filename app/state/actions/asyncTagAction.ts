import { Dispatch } from 'react';
import { iAction, iError, iTag } from '../../interfaces';
import { getTags, createTag, deleteTag, updateTagRequest } from '../../utils/ServerRequest';
import {
  tagsLoadedAction,
  addTagAction,
  removeTagAction,
  updateTagAction,
  addErrorAction,
} from './index';

type AppDispatch<T> = Dispatch<iAction<T | iError>>;

export const getAllTagsAsyncAction = () => async (dispatch: AppDispatch<boolean>) => {
  try {
    const tags = await getTags();
    dispatch(tagsLoadedAction(tags));
  } catch (error) {
    dispatch(addErrorAction({ ...error }));
  }
};

export const addTagAsyncAction = (info: iTag) => async (dispatch: AppDispatch<iTag>) => {
  try {
    const { status, data } = await createTag(info);
    console.log('new tag', data);
    if (status == 'saved') {
      dispatch(addTagAction(data));
    }
  } catch (error) {
    dispatch(addErrorAction({ ...error }));
  }
};

export const removeTagAsyncAction = (id: string) => async (dispatch: AppDispatch<string>) => {
  try {
    const { status } = await deleteTag(id);
    if (status == 'removed') {
      dispatch(removeTagAction(id));
    }
  } catch (error) {
    dispatch(addErrorAction({ ...error }));
  }
};

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
