import { Dispatch } from 'react';
import { iAction, iError, iLink, } from '../../interfaces';
import {
  getLinks,
  getLinksByTags,
  createLink,
  removeTagLinkRequest,
  removeLinkRequest,
} from '../../utils/ServerRequest';
import {
  linkLoadedAction,
  addLinkAction,
  removeTagLinkAction,
  removeLinkAction,
  addErrorAction,
} from './index';
// import { ERROR_TYPES } from '../../contans';

export const getAllLinksAction = () => async (dispatch: Dispatch<iAction<iLink[] | iError>>) => {
  try {
    const links = await getLinks();
    dispatch(linkLoadedAction(links));
  } catch (error: unknown) {
    dispatch(addErrorAction({ ...error as iError }));
  }
}

export const getAllLinksByTagsAction = (tags: string) => async (dispatch: Dispatch<iAction<iLink[] | iError>>) => {
  try {
    const links: iLink[] = await getLinksByTags(tags);
    dispatch(linkLoadedAction(links));
  } catch (error) {
    dispatch(addErrorAction({ ...error }));
  }
}

export function addLink(info) {
  return async function (dispatch) {
    try {
      const { status, data } = await createLink(info);
      if (status == 'saved') {
        dispatch(addLinkAction(data));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
}

export function removeTagLink(linkId, tagId) {
  return async function (dispatch) {
    try {
      const { status } = await removeTagLinkRequest(linkId, tagId);
      if (status == 'updated') {
        dispatch(removeTagLinkAction({ linkId, tagId }));
      } else {
        console.log('show toas "not updated"');
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
}

export function removeLink(linkId) {
  return async function (dispatch) {
    try {
      const { status } = await removeLinkRequest(linkId);
      if (status == 'removed') {
        dispatch(removeLinkAction(linkId));
      } else {
        console.log('show toas "not updated"');
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };
}

/* export function removeTag(id){
    return async function(dispatch){
        try{
            const {status} = await deleteTag(id);
            if(status == "removed"){
                dispatch(removeTagAction(id))
            }
        }catch(error){
            dispatch(addErrorAction({...error}))
        }
    }
} */
