import { ADD_TAG, REMOVE_TAG, ADD_LINK, INVALID_TAG } from "./actions-types";

export function addArticleAction(payload) {
    return {type: ADD_LINK, payload}
}

export function addTagAction(payload) {
    return {type: ADD_TAG, payload}
}

export function removeTagAction(payload) {
    return {type: REMOVE_TAG, payload}
}

export function invalidTag(payload) {
    return {type: INVALID_TAG, payload}
}
