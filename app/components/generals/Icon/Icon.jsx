import React from 'react';
import { IconPropType } from '../../../propsTypes';
import './Icon.css';

function Icon(props) {
  const { style = {}, name, color = '', pointer = false, onClick, className = '' } = props;

  return (
    <i
      onClick={onClick}
      className={`material-icons ${className} ${color} ${pointer ? 'pointer' : ''}`}
      style={style}
      data-test="icon"
    >
      {name}
    </i>
  );
}

Icon.propType = IconPropType;

export default Icon;
