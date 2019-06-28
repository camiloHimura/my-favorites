const instance = require("./axios.conf")

export function getTags(){
    return instance.get("/tag")
            .then(({data}) => data)
            .catch(catchError);
}

export function createTag(data){
    return instance.put("/tag", data)
            .then(({data}) => data)
            .catch(catchError);
        }
        
export function updateTag(id, name){
    return instance.put(`/tag/${id}`, {name})
            .then(({data}) => data)
            .catch(catchError);
}

export function deleteTag(id){
    return instance.delete(`/tag/${id}`)
            .then(({data}) => data)
            .catch(catchError);
}

function catchError(error){
    console.log("---- my handle error ---", error);
    throw(error);
}