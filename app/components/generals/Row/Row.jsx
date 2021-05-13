import React from 'react';
import PropType from 'prop-types';
import './Row.css';

function Row({ icon, children, className }) {
  return (
    <div className={`row --flexBetween ${className}`}>
      {icon && <i className="material-icons rowIcon">{icon}</i>}
      {children}
    </div>
  );
}

Row.propType = {
  icon: PropType.element,
  children: PropType.func.isRequired,
};

export default Row;
