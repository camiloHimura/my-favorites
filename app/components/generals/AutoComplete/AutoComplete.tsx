import React, { useRef, useReducer, useEffect } from 'react';
import * as R from 'ramda';

import AutoReduce from './AutoComplete.reducer';
import './AutoComplete.css';
import { iAutoComplete, iTag } from '../../../interfaces';
import * as Utils from '../../../utils';
import { KEY_CODES } from '../../../contans';

export enum Actions {
  set,
  filter,
  sweepUp,
  sweepDown,
  clear,
}

const isKeyEnterWithIndex = (indexSelector) =>
  R.both(Utils.isEnter, () => Number.isInteger(indexSelector));

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
    Utils.isNotEmptyInput,
    R.pipe(Utils.getInputValue, setFilterValue, setOptions),
    clearOptions,
  );

  const clearOptionsAndSetSelection = (option: iTag) => {
    const clearInputAfterSelecting = clearInput(
      Utils.setInputValue(inputFilter),
      option[propertyFilter],
    );
    clearOptions();
    onSelected(option);
    clearInputAfterSelecting(clearAfterSelecting);
  };

  const sweepOptions = R.cond([
    [Utils.isKeyCode(KEY_CODES.UP), () => setOptions({ type: Actions.sweepUp })],
    [Utils.isKeyCode(KEY_CODES.DOWN), () => setOptions({ type: Actions.sweepDown })],
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
