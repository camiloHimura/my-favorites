import React from 'react';
import './Search.css';
import * as R from 'ramda';
import { iSearch } from '../../interfaces';
import Input from '../generals/Input';

const Search: React.FC<iSearch> = (props) => {
  const { style = {}, onSearchLink, onGetAllLinks } = props;

  const search = R.ifElse(
    R.pathSatisfies(Boolean, ['target', 'value']),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    R.useWith(onSearchLink, [R.path(['target', 'value'])]),
    () => onGetAllLinks(),
  );

  return (
    <Input style={style} type="text" placeholder="Search" onInput={search} data-test="cp-input" />
  );
};

export default Search;
