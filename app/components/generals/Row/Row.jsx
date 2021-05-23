import React from 'react';
import PropTypes from 'prop-types';
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
  icon: PropTypes.element,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
};

export default Row;
