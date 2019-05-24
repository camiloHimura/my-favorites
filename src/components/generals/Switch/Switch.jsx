import React, {useState} from 'react';
import "./Switch.css"

function Switch(props) {

    const {icon, name = ""} = props;
    const [active, setActive] = useState(true);

    function swap(){
        setActive(!active)
    }

    console.log("active", active);
    let className = active? "slice": "slice --active";

    return  <div className="switch" onClick={swap}>
                {icon && <i className="material-icons">{icon}</i>}
                {name}
                <div className={className}></div>
            </div>
}

export default Switch ;