import React from 'react';
import "./Icon.css"

class Icon  extends React.Component{
    render(){
        const {style = {}, name, color = "", pointer = false} = this.props;

        return  <i className={`material-icons ${color} ${pointer? "pointer": ""}`} style={style}>{name}</i>
    }
}

export default Icon ;
