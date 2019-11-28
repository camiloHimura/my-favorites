import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {LinkPropType} from '../../propsTypes';
import './Link.css';

import Icon from '../generals/Icon';
import Tag from '../generals/Tag';
import Tooltip from '../generals/Tooltip';
import {removeTagLink} from "../../state/actions/";

const mapDispachToProps = dispatch => ({
    removeTagLink: (linkId, tagId) => dispatch(removeTagLink(linkId, tagId)),
  })

function Link(props) {
  const {id = 0, title, url, tags = []} = props;
  const containerUrl = useRef(null);
  const [isContHover, setIsContHover] = useState(false);

  function removeTag(tagId) {
    props.removeTagLink(props.id, tagId);
  }
  
  function removeLink() {
    console.log("linkId", props.id)
  }

  return  <div className="link">
            <div className="link__cont --title">{title}</div>
            <div className="link__cont" 
              onMouseEnter={() => setIsContHover(true)} onMouseLeave={() => setIsContHover(false)}>
                <div className="--ellipsis" ref={containerUrl}>
                  <a href={url} target="_blank">{url}</a>
                </div>
                <Tooltip text={url} hover={isContHover} parentRef={containerUrl}/>
            </div>
            <div className="link__cont --flex --wrap">{
              tags.map((tag, index) => {
                return <Tag key={`${id}-${index}`}
                            updateDisable={true} {...tag}
                            onClose={() => removeTag(tag.id)}
                        />
              })}
            </div>
            <div className="--flex">
              <div className="loading">
                <Icon name="edit" onClick={removeLink} className={"edit iconHover"} pointer={true}/>
              </div>
              <div className="loading">
                <Icon name="close" onClick={removeLink} className={"close iconHover"} pointer={true}/>
              </div>
            </div>
          </div>
}

Link.propTypes = LinkPropType

export default connect(null, mapDispachToProps)(Link);