import React, { useEffect } from 'react';
import "./Search.css"

function Search(props){
  const {style = {}, searchLink = {}, getAllLinks = {}} = props;

  function search(event){
    if(event.target.value !== ''){
      searchLink(event.target.value)
    }else{
      getAllLinks();
    }
  }

  return  <input style={style} type="search" placeholder="Search" onInput={search}/>
}

export default Search;
