import React from 'react';
import PropTypes from 'prop-types';
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

Nav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({  
        name: PropTypes.string.isRequired, 
        icon: PropTypes.string.isRequired,
        selected: PropTypes.bool
    }))
}

export default Nav ;