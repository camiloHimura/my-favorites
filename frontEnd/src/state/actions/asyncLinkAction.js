import {getLinks, createLink} from "../../utils/ServerRequest";
import {linkLoadedAction, addLinkAction, removeLinkAction} from "./index.js"

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
