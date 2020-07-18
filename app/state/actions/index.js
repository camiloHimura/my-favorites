import { ADD_TAG, REMOVE_TAG, INVALID_TAG, TAGS_LOADED, UPADTED_TAG, ADD_LINK, LINKS_LOADED, 
        REMOVE_LINK, INVALID_LINK, REMOVE_TAG_LINK, SEARCH_LINK, SET_LS_URL, SET_LS_TITLE, 
        SET_LS_TAGS, CLEAR_LS, ADD_ERROR, SHOW_INDEX, ERROR_INDEX} from "./actions-types";

export { getAllTags, addTag, removeTag, updateTag} from "./asyncTagAction";
export { getAllLinks, getAllLinksByTags, addLink, removeTagLink, removeLink} from "./asyncLinkAction";

export function linkLoadedAction(payload) {
  return {type: LINKS_LOADED, payload}
}

export function addLinkAction(payload) {
  return {type: ADD_LINK, payload}
}

export function removeLinkAction(payload) {
  return {type: REMOVE_LINK, payload}
}

export function searchLinkAction(payload) {
  return {type: SEARCH_LINK, payload}
}

export function invalidLink(payload) {
  return {type: INVALID_LINK, payload}
}

export function removeTagLinkAction(payload) {
  return {type: REMOVE_TAG_LINK, payload}
}

export function tagsLoadedAction(payload) {
  return {type: TAGS_LOADED, payload}
}

export function addTagAction(payload) {
  return {type: ADD_TAG, payload}
}

export function updateTagAction(payload) {
  return {type: UPADTED_TAG, payload}
}

export function removeTagAction(payload) {
  return {type: REMOVE_TAG, payload}
}

export function invalidTag(payload) {
  return {type: INVALID_TAG, payload}
}
//Local Storage actions
export function setLsUrlAction(payload) {
  return {type: SET_LS_URL, payload}
}

export function setLsTitleAction(payload) {
  return {type: SET_LS_TITLE, payload}
}

export function setLsTagsAction(payload) {
  return {type: SET_LS_TAGS, payload}
}

export function clearLsAction(payload) {
  return {type: CLEAR_LS, payload}
}

export function addErrorAction(payload) {
  return {type: ADD_ERROR, payload}
}

export function setSideBarIndex(payload) {
  return {type: SHOW_INDEX, payload}
}

export function setSideBarErrorIndex(payload) {
  return {type: ERROR_INDEX, payload}
}
