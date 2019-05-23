import React from 'react';
import "./Tag.css"

import Icon from '../Icon';

class Tag  extends React.Component{

    state = {
        active: true
    }

    swap = () => {
        this.setState(prev => ({active: !prev.active}))
    }

    render(){
        const {background = "#0396A6", onClose, name = ""} = this.props;

        return  <div className="Tag" onClick={this.swap} style={{"background": background}} >
                    <Icon name="close" onClick={onClose} className={"close"} pointer={true}/>
                    {name}
                </div>
    }
}

export default Tag;