import React from 'react';
import "./Search.css"

class Search  extends React.Component{
    
    render(){
        const {style = {}} = this.props
        return  <input style={style} type="text" placeholder="Search"/>
    }
}

export default Search ;