import React from 'react';
import "./Row.css"

function Row({icon, children, className}) {
    return  <div className={`row --flexBetween ${className}`}>
                {icon && <i className="material-icons rowIcon">{icon}</i>}
                {children()}
            </div>
}

export default Row ;