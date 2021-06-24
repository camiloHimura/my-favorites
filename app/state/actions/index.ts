/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { iError, iAction, iLink, iTag } from '../../interfaces';
import { iTagLink } from '../../interfaces/iTagLink';
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

export {
  getAllTagsAsyncAction,
  addTagAsyncAction,
  removeTagAsyncAction,
  updateTagAsyncAction,
} from './asyncTagAction';
export {
  getAllLinksAction,
  getAllLinksByTagsAction,
  addLinkAsyncAction,
  removeTagLinkAsyncAction,
  removeLinkAsyncAction,
} from './asyncLinkAction';

export const linkLoadedAction = (payload: iLink[]): iAction<iLink[]> => ({
  type: LINKS_LOADED,
  payload,
});

export const addLinkAction = (payload) => ({ type: ADD_LINK, payload });

export const removeLinkAction = (payload: string): iAction<string> => ({
  type: REMOVE_LINK,
  payload,
});

export const searchLinkAction = (payload: string): iAction<string> => ({
  type: SEARCH_LINK,
  payload,
});

export const invalidLink = (payload) => ({ type: INVALID_LINK, payload });

export const removeTagLinkAction = (payload: iTagLink): iAction<iTagLink> => ({
  type: REMOVE_TAG_LINK,
  payload,
});

export const tagsLoadedAction = (payload: boolean): iAction<boolean> => ({
  type: TAGS_LOADED,
  payload,
});

export const addTagAction = (payload: iTag): iAction<iTag> => ({ type: ADD_TAG, payload });

export const updateTagAction = (payload: iTag): iAction<iTag> => ({ type: UPADTED_TAG, payload });

export const removeTagAction = (payload: string): iAction<string> => ({
  type: REMOVE_TAG,
  payload,
});

export const invalidTag = (payload) => ({ type: INVALID_TAG, payload });

//Local Storage actions
export const setLsUrlAction = (payload: string): iAction<string> => ({ type: SET_LS_URL, payload });

export const setLsTitleAction = (payload: string): iAction<string> => ({
  type: SET_LS_TITLE,
  payload,
});

export const setLsTagsAction = (payload: iTag[]): iAction<iTag[]> => ({
  type: SET_LS_TAGS,
  payload,
});

export const clearLsAction = (): iAction<undefined> => ({ type: CLEAR_LS });

export const addErrorAction = (payload: iError): iAction<iError> => ({ type: ADD_ERROR, payload });

export const setSideBarIndexAction = (payload: number): iAction<number> => ({
  type: SHOW_INDEX,
  payload,
});

export const setSideBarErrorIndexAction = (payload: number): iAction<number> => ({
  type: ERROR_INDEX,
  payload,
});
