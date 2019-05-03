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
        const {icon} = this.props;
        let className = this.state.active? "slice": "slice --active";

        return  <div className="switch" onClick={this.swap}>
                    <i className="material-icons">{icon}</i>
                    <div className={className}></div>
                </div>
    }
}

export default Switch ;