/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { iError, iAction } from '../../interfaces';
import {
  ADD_TAG,
  REMOVE_TAG,
  INVALID_TAG,
  TAGS_LOADED,
  UPADTED_TAG,
  ADD_LINK,
  LINKS_LOADED,
  REMOVE_LINK,
  INVALID_LINK,
  REMOVE_TAG_LINK,
  SEARCH_LINK,
  SET_LS_URL,
  SET_LS_TITLE,
  SET_LS_TAGS,
  CLEAR_LS,
  ADD_ERROR,
  SHOW_INDEX,
  ERROR_INDEX,
} from './actions-types';

export { getAllTags, addTag, removeTag, updateTag } from './asyncTagAction';
export {
  getAllLinks,
  getAllLinksByTags,
  addLink,
  removeTagLink,
  removeLink,
} from './asyncLinkAction';

export const linkLoadedAction = (payload) => ({ type: LINKS_LOADED, payload });

export const addLinkAction = (payload) => ({ type: ADD_LINK, payload });

export const removeLinkAction = (payload) => ({ type: REMOVE_LINK, payload });

export const searchLinkAction = (payload) => ({ type: SEARCH_LINK, payload });

export const invalidLink = (payload) => ({ type: INVALID_LINK, payload });

export const removeTagLinkAction = (payload) => ({ type: REMOVE_TAG_LINK, payload });

export const tagsLoadedAction = (payload) => ({ type: TAGS_LOADED, payload });

export const addTagAction = (payload) => ({ type: ADD_TAG, payload });

export const updateTagAction = (payload) => ({ type: UPADTED_TAG, payload });

export const removeTagAction = (payload) => ({ type: REMOVE_TAG, payload });

export const invalidTag = (payload) => ({ type: INVALID_TAG, payload });

//Local Storage actions
export const setLsUrlAction = (payload) => ({ type: SET_LS_URL, payload });

export const setLsTitleAction = (payload) => ({ type: SET_LS_TITLE, payload });

export const setLsTagsAction = (payload) => ({ type: SET_LS_TAGS, payload });

export const clearLsAction = (): iAction<unknown> => ({ type: CLEAR_LS });

export const addErrorAction = (payload: iError): iAction<iError> => ({ type: ADD_ERROR, payload });

export const aSetSideBarIndex = (payload: number): iAction<number> => ({
  type: SHOW_INDEX,
  payload,
});

export const aSetSideBarErrorIndex = (payload: number): iAction<number> => ({
  type: ERROR_INDEX,
  payload,
});
