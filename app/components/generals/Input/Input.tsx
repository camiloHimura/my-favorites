import React, { RefAttributes } from 'react';
import './Input.css';

interface iProps {
  style?: any;
  className?: string;
  'data-test'?: string;
  placeholder?: string;
  type?: 'search' | 'text';
  onInput?: R.Arity1Fn | (() => any);
  onChange?: R.Arity1Fn | (() => any);
  onFocus?: R.Arity1Fn | (() => any);
}

const Input: React.FC<iProps & RefAttributes<HTMLInputElement>> = React.forwardRef((props, ref) => {
  const {
    style = {},
    type = 'text',
    onInput,
    onChange,
    onFocus,
    className = '',
    placeholder = '',
  } = props;
  return (
    <input
      ref={ref}
      type={type}
      style={style}
      onInput={onInput}
      onFocus={onFocus}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      data-test={props['data-test']}
    />
  );
});

Input.displayName = 'Input';

export default Input;
