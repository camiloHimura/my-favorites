import React from 'react';
import "./Icon.css"

function Icon (props){
    const {style = {}, name, color = "", pointer = false, onClick, className = ""} = props;

    return  <i onClick={onClick} className={`material-icons ${className} ${color} ${pointer? "pointer": ""}`} style={style}>
                {name}
            </i>
}

export default Icon;
