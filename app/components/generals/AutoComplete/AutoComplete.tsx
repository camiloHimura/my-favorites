import React, { useRef, useReducer, useEffect } from 'react';
import AutoReduce from './AutoComplete.reducer';
import './AutoComplete.css';
import { iAutoComplete, iInput, iTag } from '../../../interfaces';
import * as R from 'ramda';

export enum Actions {
  set,
  filter,
  sweepUp,
  sweepDown,
  clear,
}
const isValidValue = R.converge(R.and, [R.complement(R.isEmpty), R.length]);
const getInputValue: (event) => string = R.path(['target', 'value']);
const changeInput = (input: iInput) => (val: string) => (input.current.value = val);
const idKeyCode = (code) => R.propSatisfies(R.equals(code), 'keyCode');
const isKeyEnterWithIndex = (indexSelector) =>
  R.both(idKeyCode(13), () => Number.isInteger(indexSelector));

const clearInput = (handler: (val: string) => void, newValue: string) =>
  R.ifElse(
    R.equals(true),
    () => handler(''),
    () => handler(newValue),
  );

const AutoComplete: React.FC<iAutoComplete> = ({
  onSelected,
  propertyFilter,
  autoHide = true,
  placeHolder = '',
  options: initOptions = [],
  clearAfterSelecting = false,
}) => {
  const divOptions = useRef(null);
  const inputFilter = useRef(null);
  const [state, setOptions] = useReducer(AutoReduce, { showOptions: false });
  const { options, showOptions, indexSelector } = state;

  useEffect(() => {
    setOptions({ type: Actions.set, options: [...initOptions] });
  }, [initOptions]);

  const clearOptions = () => setOptions({ type: Actions.clear });

  const setFilterValue = (value: string) => ({
    value,
    propertyFilter,
    type: Actions.filter,
    options: initOptions,
  });

  const onFilter = R.ifElse(
    R.useWith(isValidValue, [getInputValue]),
    R.pipe(getInputValue, setFilterValue, setOptions),
    clearOptions,
  );

  const clearOptionsAndSetSelection = (option: iTag) => {
    const clerInputclearAfterSelecting = clearInput(
      changeInput(inputFilter),
      option[propertyFilter],
    );
    clearOptions();
    onSelected(option);
    clerInputclearAfterSelecting(clearAfterSelecting);
  };

  const sweepOptions = R.cond([
    [idKeyCode(38), () => setOptions({ type: Actions.sweepUp })],
    [idKeyCode(40), () => setOptions({ type: Actions.sweepDown })],
    [isKeyEnterWithIndex(indexSelector), () => clearOptionsAndSetSelection(options[indexSelector])],
  ]);

  const closeOptions = R.when(R.equals(true), clearOptions);

  return (
    <div className="autoComplete">
      <input
        type="text"
        ref={inputFilter}
        onChange={onFilter}
        onBlur={() => closeOptions(autoHide)}
        data-test="input"
        onKeyDown={sweepOptions}
        placeholder={placeHolder}
      />

      <div className="autoComplete__contOptions" ref={divOptions} data-test="contOptions">
        {showOptions &&
          options.map((opt, index) => (
            <button
              data-test="options"
              key={`${opt.id}-autocomplete`}
              onMouseDown={() => clearOptionsAndSetSelection(opt)}
              className={`${indexSelector === index ? 'select' : ''}`}
            >
              {opt.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default AutoComplete;
