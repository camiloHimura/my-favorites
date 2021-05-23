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

Row.propTypes = {
  icon: PropType.element,
  className: PropType.string,
  children: PropType.func.isRequired,
};

export default Row;
