const instance = require("./axios.conf")

export async function getTags(){
    return instance.get("/tag").then(({data}) => data);
}

export async function createTag(data){
    return instance.put("/tag", data).then(({data}) => data);
}

