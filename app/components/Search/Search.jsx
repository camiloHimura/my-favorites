import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

function Search(props) {
  const { style = {}, searchLink = {}, getAllLinks = {} } = props;

  function search(event) {
    if (event.target.value !== '') {
      searchLink(event.target.value);
    } else {
      getAllLinks();
    }
  }

  return <input style={style} type="search" placeholder="Search" onInput={search} />;
}

Search.propTypes = {
  style: PropTypes.object,
  searchLink: PropTypes.func,
  getAllLinks: PropTypes.func,
};

export default Search;
