import { ADD_TAG, REMOVE_TAG, INVALID_TAG, TAGS_LOADED, UPADTED_TAG, ADD_LINK, LINKS_LOADED, 
        REMOVE_LINK, INVALID_LINK, REMOVE_TAG_LINK} from "./actions-types";

export { getAllTags, addTag, removeTag, updateTag} from "./asyncTagAction";
export { getAllLinks, addLink, removeTagLink, removeLink} from "./asyncLinkAction";

export function linkLoadedAction(payload) {
    return {type: LINKS_LOADED, payload}
}

export function addLinkAction(payload) {
    return {type: ADD_LINK, payload}
}

export function removeLinkAction(payload) {
    return {type: REMOVE_LINK, payload}
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

