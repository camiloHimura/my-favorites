import React from 'react';
import "./Row.css"

class Row  extends React.Component{

    render(){

        return  <div className="row">
                    <i className="material-icons rowIcon">{this.props.icon}</i>
                    {this.props.children()}
                </div>
    }
}

export default Row ;