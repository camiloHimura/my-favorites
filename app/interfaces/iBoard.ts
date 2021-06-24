import React from 'react';
import iTag from './iTag';

export default interface iBoard<T> {
  options: iTag[];
  isWrap: boolean;
  className: string;
  placeHolder: string;
  Component: React.FC<T>;
  setOptions: (tag: iTag) => void;
}
