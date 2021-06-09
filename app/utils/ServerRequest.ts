import instance from './axios.conf';
import catchError from './CatchError';

export function getTags() {
  return instance
    .get('/tag')
    .then(({ data }) => data)
    .catch(catchError);
}

export function createTag(info) {
  return instance
    .put('/tag', info)
    .then(({ data }) => data)
    .catch(catchError);
}

export function updateTagRequest(id, name) {
  return instance
    .put(`/tag/${id}`, { name })
    .then(({ data }) => data)
    .catch(catchError);
}

export function deleteTag(id) {
  return instance
    .delete(`/tag/${id}`)
    .then(({ data }) => data)
    .catch(catchError);
}

export function getLinks() {
  return instance
    .get('/link')
    .then(({ data }) => data)
    .catch(catchError);
}

export function getLinksByTags(tags: string) {
  return instance
    .get(`/link/byTags/${tags}`)
    .then(({ data }) => data)
    .catch(catchError);
}

export function createLink(info) {
  return instance
    .put('/link', info)
    .then(({ data }) => data)
    .catch(catchError);
}

export function removeLinkRequest(id) {
  return instance
    .delete(`/link/${id}`)
    .then(({ data }) => data)
    .catch(catchError);
}

export function removeTagLinkRequest(linkID, tagID) {
  return instance
    .put(`/link/${linkID}/${tagID}`)
    .then(({ data }) => data)
    .catch(catchError);
}
