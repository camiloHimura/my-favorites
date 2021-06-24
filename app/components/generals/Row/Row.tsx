import React from 'react';

import './Row.css';

interface iProps {
  icon?: React.FC;
  className: string;
  children?: JSX.Element | JSX.Element[];
}

const Row: React.FC<iProps> = ({ icon, children, className }) => {
  return (
    <div className={`row --flexBetween ${className}`}>
      {icon && <i className="material-icons rowIcon">{icon}</i>}
      {children}
    </div>
  );
};

export default Row;
