import React from 'react';

export default React.createContext({
    tags: [],
    getTags: () =>{},
    getOne(index){
        return {...this.tags[index], getTags: this.getTags}
    }
});