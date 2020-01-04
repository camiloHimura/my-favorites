import React, {useRef} from 'react'; 
import PropTypes from 'prop-types';
import './Board.css';

import {KEY_CODES} from '../../../contans'
import Colors from '../../../utils/Colors';

const {ENTER} = KEY_CODES;

function BoardTags(props) {
  let {options = [], setOptions, isWrap = false, placeHolder = "", Component, className, Input} = props;
  
  const inputOptions = useRef();

  function addOption(event){
    let element = event.target;

    if(event.keyCode === ENTER && element.value !== ""){
      setOptions({name: element.value, color: Colors.getRamdom()});
      inputOptions.current.value = "";
    }
  }

  return  <div className={`board ${className} --flex ${isWrap? "--wrap": ""}`}>
            {Input && <Input/>}
            {!Input && <input placeholder={placeHolder} onKeyDown={addOption} ref={inputOptions}/>}
            <div className="contOptions">
                {options.map((option, index) => <Component key={`${index}-${className}`} {...option}/>)}
            </div>
          </div>

}

Colors.propTypes = {
  isWrap: PropTypes.bool, 
  Input: PropTypes.element,
  options: PropTypes.array.isRequired,
  setOptions: PropTypes.func, 
  className: PropTypes.string, 
  Component: PropTypes.element.isRequired, 
  placeHolder: PropTypes.string, 
}

export default BoardTags;
