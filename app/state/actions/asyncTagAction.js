import { getTags, createTag, deleteTag, updateTagRequest } from '../../utils/ServerRequest';
import {
  tagsLoadedAction,
  addTagAction,
  removeTagAction,
  updateTagAction,
  addErrorAction,
} from './index.js';

export function getAllTags() {
  return async function (dispatch) {
    try {
      let tags = await getTags();
      dispatch(tagsLoadedAction(tags));
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
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

export function updateTag(id, name) {
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
