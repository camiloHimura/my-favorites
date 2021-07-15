import React from 'react';
import './Search.css';
import * as Utils from '../../utils';
import * as R from 'ramda';
import { iSearch } from '../../interfaces';
import Input from '../generals/Input';

const Search: React.FC<iSearch> = (props) => {
  const { style = {}, onSearchLink, onGetAllLinks } = props;

  const search = R.ifElse(
    Utils.isNotEmptyInput,
    R.useWith(onSearchLink, [Utils.getInputValue]),
    () => onGetAllLinks(),
  );

  const bounceSearch = Utils.bounce(search, 200);

  return (
    <Input
      style={style}
      type="text"
      placeholder="Search"
      onInput={bounceSearch}
      data-test="cp-input"
    />
  );
};

export default Search;
