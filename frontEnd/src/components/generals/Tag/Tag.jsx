import React, {useState} from 'react';
import "./Tag.css"

import Icon from '../Icon';

function Tag(props){
    const [active, setActive] = useState(true);
    const {color = "0396A6", onClose, name = ""} = props;

    return  <div className="Tag --ellipsis" style={{"background": `#${color}`}} >
                <Icon name="close" onClick={onClose} className={"close"} pointer={true}/>
                {name}
            </div>

}

export default Tag;