import { iError, iLink } from '../../interfaces';
import { iAsynchDispatch } from '../../interfaces/iAsynchDispatch';
import { iNewLink } from '../../interfaces/iLink';
import { iTagLink } from '../../interfaces/iTagLink';
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

export const getAllLinksAction =
  () =>
  async (dispatch: iAsynchDispatch<iLink[]>): Promise<void> => {
    try {
      const links = await getLinks();
      dispatch(linkLoadedAction(links));
    } catch (error: unknown) {
      dispatch(addErrorAction({ ...(error as iError) }));
    }
  };

export const getAllLinksByTagsAction =
  (tags: string) =>
  async (dispatch: iAsynchDispatch<iLink[]>): Promise<void> => {
    try {
      const links = await getLinksByTags(tags);
      dispatch(linkLoadedAction(links));
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };

export const removeLinkAsyncAction =
  (linkId: string) =>
  async (dispatch: iAsynchDispatch<string>): Promise<void> => {
    try {
      const { status } = await removeLinkRequest(linkId);
      if (status == 'removed') {
        dispatch(removeLinkAction(linkId));
      } else {
        //Todo add toast
        console.log('show toas "not updated"');
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };

export const removeTagLinkAsyncAction =
  (linkId: string, tagId: string) =>
  async (dispatch: iAsynchDispatch<iTagLink>): Promise<void> => {
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

export const addLinkAsyncAction =
  (info: iNewLink) =>
  async (dispatch: iAsynchDispatch<iLink>): Promise<void> => {
    try {
      const { status, data } = await createLink(info);
      if (status == 'saved') {
        dispatch(addLinkAction(data));
      }
    } catch (error) {
      dispatch(addErrorAction({ ...error }));
    }
  };

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
