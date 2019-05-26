import React from 'react';
import "./Nav.css"

function Nav(props){

    return  <nav>
                {props.items.map(({name, icon, selected = false}) => 
                        <div key={name} className={selected ? "--selected": ""}>
                            <i className="material-icons">{icon}</i>
                            {name}    
                        </div>)}
            </nav>

}

export default Nav ;