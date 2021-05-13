import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Board.css';

import { KEY_CODES } from '../../../contans';
import Colors from '../../../utils/Colors';

const { ENTER } = KEY_CODES;

function BoardTags(props) {
  let { options = [], setOptions, isWrap = false, placeHolder = '', Component, className } = props;

  const inputOptions = useRef();

  function addOption(event) {
    let element = event.target;

    if (event.keyCode === ENTER && element.value !== '') {
      setOptions({ name: element.value, color: Colors.getRamdom() });
      inputOptions.current.value = '';
    }
  }

  return (
    <div className={`board ${className} --flex ${isWrap ? '--wrap' : ''}`}>
      <input placeholder={placeHolder} onKeyDown={addOption} ref={inputOptions} data-test="input" />
      <div className="contOptions" data-test="container">
        {options.map((option, index) => (
          <Component key={`${index}-${className}`} {...option} data-test="element" />
        ))}
      </div>
    </div>
  );
}

Colors.propTypes = {
  isWrap: PropTypes.bool,
  setOptions: PropTypes.func,
  className: PropTypes.string,
  placeHolder: PropTypes.string,
  options: PropTypes.array.isRequired,
  Component: PropTypes.func.isRequired,
};

export default BoardTags;
