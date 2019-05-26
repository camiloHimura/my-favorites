const axios = require('axios');

function fake(data){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 1000)
    })
}

export async function getTags(){
    /* let data = await axios.get('http://trucosfrontend.com/api/')
    console.log("data", data); */
    let info = await axios.get('http://trucosfrontend.com/api/');
    console.log("info", info)
    return info;
}

export async function getLinks(){
    
}

