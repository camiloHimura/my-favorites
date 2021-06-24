import React from 'react';
import './Icon.css';

function Icon(props) {
  const { style = {}, name, color = '', pointer = false, onClick, className = '' } = props;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <i
      onClick={onClick}
      onKeyDown={onClick}
      className={`material-icons ${className} ${color} ${pointer ? 'pointer' : ''}`}
      style={style}
      data-test="icon"
      role="img"
    >
      {name}
    </i>
  );
}

// Icon.propTypes = IconPropType;

export default Icon;
