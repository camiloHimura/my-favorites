import React, { useRef, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import AutoReduce from './AutoComplete.reducer.js';
import './AutoComplete.css';

function AutoComplete(props) {
  const divOptions = useRef();
  const inputFilter = useRef();
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
    setOptions({ type: 'set', initOptions: [...initOptions] });
  }, [initOptions]);

  function filter(event) {
    let element = event.target;

    if (element.value !== '' && element.value.length > 1) {
      setOptions({ type: 'filter', initOptions, propertyFilter, value: element.value });
    } else {
      setOptions({ type: 'clear' });
    }
  }

  function sweepOptions(event) {
    if (showOptions == false) {
      return;
    }

    if (event.keyCode === 38) {
      event.preventDefault();
      setOptions({ type: 'sweepUp' });
    }

    if (event.keyCode === 40) {
      event.preventDefault();
      setOptions({ type: 'sweepDown' });
    }

    if (event.keyCode === 13 && Number.isInteger(indexSelector)) {
      setOptions({ type: 'clear' });
      onSelected(options[indexSelector]);

      if (!clearAfterSelecting) {
        inputFilter.current.value = options[indexSelector][propertyFilter];
      } else {
        inputFilter.current.value = '';
      }
    }
  }

  function clickOption(index) {
    onSelected(options[index]);
    setOptions({ type: 'clear' });

    if (!clearAfterSelecting) {
      inputFilter.current.value = options[index][propertyFilter];
    } else {
      inputFilter.current.value = '';
    }
  }

  function closeOptions() {
    if (autoHide) {
      setOptions({ type: 'clear' });
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

AutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  autoHide: PropTypes.bool,
  onSelected: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  propertyFilter: PropTypes.string,
  clearAfterSelecting: PropTypes.bool,
};

export default AutoComplete;
