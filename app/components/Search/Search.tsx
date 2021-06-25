import React from 'react';
import './Search.css';
import { iSearch } from '../../interfaces';

const Search: React.FC<iSearch> = (props) => {
  const { style = {}, onSearchLink, onGetAllLinks } = props;

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.value) {
      onSearchLink(event.target.value);
    } else {
      onGetAllLinks();
    }
  };

  return <input style={style} type="search" placeholder="Search" onInput={search} />;
};

export default Search;
