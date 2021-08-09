import React from 'react';
import * as R from '../../../utils/R';
import './Board.css';

import Colors from '../../../utils/Colors';
import { iTag, iBoard } from '../../../interfaces';
import { getInputValue, isEnter, isNotEmptyInput, setInputValue } from '../../../utils';

const BoardTags: React.FC<iBoard<iTag>> = ({
  className,
  Component,
  setOptions,
  options = [],
  isWrap = false,
  placeHolder = '',
}) => {
  const isValidNameAndTypedEnter = R.both(isEnter, isNotEmptyInput);

  const addOption = R.when(isValidNameAndTypedEnter, (event) => {
    setOptions({ name: getInputValue(event), color: Colors.getRamdom() });
    setInputValue(event)('');
  });

  return (
    <div className={`board ${className} --flex ${isWrap ? '--wrap' : ''}`}>
      <input placeholder={placeHolder} onKeyDown={addOption} data-test="input" />
      <div className="contOptions" data-test="container">
        {options.map((option) => (
          <Component key={`${option.id}-Board`} {...option} data-test="element" />
        ))}
      </div>
    </div>
  );
};

export default BoardTags;
