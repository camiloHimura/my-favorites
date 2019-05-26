import React from 'react';
import "./Link.css";

import Tag from "../generals/Tag";

function Link(props) {
    const {id = 0, title, url, keywords = [], tags = []} = props;

    return  <div className="link">
                <div className="link__cont --title">{title}</div>
                <div className="link__cont --ellipsis"><a href={url} target="_blank">{url}</a></div>
                <div className="link__cont --flex --wrap">{tags.map((tag, index) => <Tag key={`${id}-${index}`} {...tag}/>)}</div>
            </div>

}

export default Link ;