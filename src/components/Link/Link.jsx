import React from 'react';
import "./Link.css";

import Tag from "../generals/Tag";

class Link  extends React.Component{

    render(){
        const tags = Array.from({length: 10}, () => ({name: "test"}))
        const {id = 0, title, url, keywords = []} = this.props;

        return  <div className="link">
                    <div className="link__cont --title">{title}</div>
                    <div className="link__cont"><a href={url} target="_blank">{url}</a></div>
                    <div className="link__cont --flex --wrap">{tags.map((tag, index) => <Tag key={`${id}-${index}`} {...tag}/>)}</div>
                </div>
    }
}

export default Link ;