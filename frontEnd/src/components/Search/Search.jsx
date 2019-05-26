import React from 'react';
import "./Search.css"

function Search(props){
    const {style = {}} = props;

    return  <input style={style} type="search" placeholder="Search"/>
}

export default Search ;
