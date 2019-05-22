import React from 'react';
import "./Row.css"

class Row  extends React.Component{

    render(){
        return  <div className="row">
                    {this.props.icon && <i className="material-icons rowIcon">{this.props.icon}</i>}
                    {this.props.children()}
                </div>
    }
}

export default Row ;