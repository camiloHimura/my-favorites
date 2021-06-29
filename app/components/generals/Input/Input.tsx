import React from 'react';
import './Input.css';

interface iProps {
  style?: any;
  className?: string;
  onInput?: R.Arity1Fn | (() => any);
  onChange?: R.Arity1Fn | (() => any);
  placeholder?: string;
  type?: 'search' | 'text';
}

const Input: React.FC<iProps> = React.memo((props) => {
  const { style = {}, type = 'text', onInput, onChange, className = '', placeholder = '' } = props;
  console.log('==> render Input');
  return (
    <input
      style={style}
      className={className}
      type={type}
      onInput={onInput}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
});

Input.displayName = 'Input';

export default Input;
