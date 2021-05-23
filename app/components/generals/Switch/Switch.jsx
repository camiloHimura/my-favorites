import React, { useState } from 'react';
import PropType from 'prop-types';
import './Switch.css';

function Switch(props) {
  const { icon, name = '' } = props;
  const [active, setActive] = useState(true);

  function swap() {
    setActive(!active);
  }

  let className = active ? 'slice' : 'slice --active';

  return (
    <button className="switch" onClick={swap}>
      {icon && <i className="material-icons">{icon}</i>}
      {name}
      <div className={className}></div>
    </button>
  );
}

Switch.propTypes = {
  icon: PropType.element,
  name: PropType.string.isRequired,
};

export default Switch;
