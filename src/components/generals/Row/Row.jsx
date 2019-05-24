import React from 'react';
import "./Row.css"

function Row(props) {
    return  <div className="row">
                {props.icon && <i className="material-icons rowIcon">{props.icon}</i>}
                {props.children()}
            </div>
}

export default Row ;