import React from 'react';
import "./Switch.css"

class Switch  extends React.Component{

    state = {
        active: true
    }

    swap = () => {
        this.setState(prev => ({active: !prev.active}))
    }

    render(){
        console.log(this.state);
        const {icon, name = ""} = this.props;
        let className = this.state.active? "slice": "slice --active";

        return  <div className="switch" onClick={this.swap}>
                    {icon && <i className="material-icons">{icon}</i>}
                    {name}
                    <div className={className}></div>
                </div>
    }
}

export default Switch ;