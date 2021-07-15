import React from 'react';
import './Button.css';

interface iProps {
  style?: any;
  text?: string;
  className?: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<iProps> = React.memo((props) => {
  const { style = {}, type = 'button', onClick, className = '', text = '' } = props;

  return (
    <button style={style} className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
