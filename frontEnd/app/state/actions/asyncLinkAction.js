import {getLinks, createLink, removeTagLinkRequest, removeLinkRequest} from "../../utils/ServerRequest";
import {linkLoadedAction, addLinkAction, removeTagLinkAction, removeLinkAction} from "./index.js"

export function getAllLinks(){
    return async function(dispatch){
        try{
            let links = await getLinks();
            dispatch(linkLoadedAction(links))
        }catch(error){
            console.error("error", error)
        }
    }
}

export function addLink(info){
    console.log("addLink", info)
    return async function(dispatch){
        try{
            const {status, data} = await createLink(info);
            if(status == "saved"){
                dispatch(addLinkAction(data))
            }
        }catch(error){
            console.error("error", error)
        }
    }
}

export function removeTagLink(linkId, tagId){
  return async function(dispatch){
      try{
          const {status} = await removeTagLinkRequest(linkId, tagId);
          if(status == "updated"){
              dispatch(removeTagLinkAction({linkId, tagId}))
          }else{
              console.log('show toas "not updated"')
          }
      }catch(error){
          console.error("error", error)
      }
  }
}

export function removeLink(linkId){
  return async function(dispatch){
      console.log("removeLink", linkId)
      try{
          const {status} = await removeLinkRequest(linkId);
          if(status == "removed"){
              dispatch(removeLinkAction(linkId))
          }else{
              console.log('show toas "not updated"')
          }
      }catch(error){
          console.error("error", error)
      }
  }
}

/* export function removeTag(id){
    return async function(dispatch){
        try{
            const {status} = await deleteTag(id);
            if(status == "removed"){
                dispatch(removeTagAction(id))
            }
        }catch(error){
            console.error("error", error)
        }
    }
} */
