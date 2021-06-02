import React, { useRef, useReducer, useEffect } from 'react';
import AutoReduce from './AutoComplete.reducer';
import './AutoComplete.css';
import { iAutoComplete } from '../../../interfaces';

export enum Actions {
  set,
  filter,
  sweepUp,
  sweepDown,
  clear,
}

const AutoComplete: React.FC<iAutoComplete> = (props) => {
  const divOptions = useRef(null);
  const inputFilter = useRef(null);
  let [state, setOptions] = useReducer(AutoReduce, { showOptions: false });

  const { options, showOptions, indexSelector } = state;
  const {
    options: initOptions = [],
    propertyFilter,
    onSelected,
    autoHide = true,
    placeHolder = '',
    clearAfterSelecting = false,
  } = props;

  useEffect(() => {
    setOptions({ type: Actions.set, initOptions: [...initOptions] });
  }, [initOptions]);

  const filter = (event) => {
    let element = event.target;

    if (element.value !== '' && element.value.length > 1) {
      setOptions({ type: Actions.filter, initOptions, propertyFilter, value: element.value });
    } else {
      setOptions({ type: Actions.clear });
    }
  }

  const sweepOptions = (event) => {
    if (showOptions == false) {
      return;
    }

    if (event.keyCode === 38) {
      event.preventDefault();
      setOptions({ type: Actions.sweepUp });
    }

    if (event.keyCode === 40) {
      event.preventDefault();
      setOptions({ type: Actions.sweepDown });
    }

    if (event.keyCode === 13 && Number.isInteger(indexSelector)) {
      setOptions({ type: Actions.clear });
      onSelected(options[indexSelector]);

      if (!clearAfterSelecting) {
        inputFilter.current.value = options[indexSelector][propertyFilter];
      } else {
        inputFilter.current.value = '';
      }
    }
  }

  const clickOption = (index) => {
    onSelected(options[index]);
    setOptions({ type: Actions.clear });

    if (!clearAfterSelecting) {
      inputFilter.current.value = options[index][propertyFilter];
    } else {
      inputFilter.current.value = '';
    }
  }

  const closeOptions = () => {
    if (autoHide) {
      setOptions({ type: Actions.clear });
    }
  }

  return (
    <div className="autoComplete">
      <input
        type="text"
        ref={inputFilter}
        onChange={filter}
        onBlur={closeOptions}
        data-test="input"
        onKeyDown={sweepOptions}
        placeholder={placeHolder}
      />

      <div className="autoComplete__contOptions" ref={divOptions} data-test="contOptions">
        {showOptions &&
          options.map((opt, index) => (
            <button
              data-test="options"
              key={`${index}-autocomplete`}
              onMouseDown={() => clickOption(index)}
              className={`${indexSelector === index ? 'select' : ''}`}
            >
              {opt.name}
            </button>
          ))}
      </div>
    </div>
  );
}

export default AutoComplete;
