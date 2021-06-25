import { iTag } from '../../interfaces';
import { iAsynchDispatch } from '../../interfaces/iAsynchDispatch';
import { getTags, createTag, deleteTag, updateTagRequest } from '../../utils/ServerRequest';
import {
  tagsLoadedAction,
  addTagAction,
  removeTagAction,
  updateTagAction,
  addErrorAction,
} from './index';

export const getAllTagsAsyncAction =
  () =>
  async (dispatch: iAsynchDispatch<iTag[]>): Promise<void> => {
    try {
      const tags = await getTags();
      dispatch(tagsLoadedAction(tags));
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };

export const addTagAsyncAction =
  (info: iTag) =>
  async (dispatch: iAsynchDispatch<iTag>): Promise<void> => {
    try {
      const { status, data } = await createTag(info);
      if (status == 'saved') {
        dispatch(addTagAction(data));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };

export const removeTagAsyncAction =
  (id: string) =>
  async (dispatch: iAsynchDispatch<string>): Promise<void> => {
    try {
      const { status } = await deleteTag(id);
      if (status == 'removed') {
        dispatch(removeTagAction(id));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };

export const updateTagAsyncAction =
  (id: string, name: string) =>
  async (dispatch: iAsynchDispatch<iTag>): Promise<void> => {
    try {
      const { status, data } = await updateTagRequest(id, name);
      if (status == 'updated') {
        dispatch(updateTagAction(data));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
