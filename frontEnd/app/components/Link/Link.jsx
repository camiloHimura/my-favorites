import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {LinkPropType} from '../../propsTypes';
import './Link.css';

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

  function remove(tagId) {
    props.removeTagLink(props.id, tagId);
  }

  return  <div className="link">
            <div className="link__cont --title">{title}</div>
            <div className="link__cont --ellipsis" ref={containerUrl} 
              onMouseEnter={() => setIsContHover(true)} onMouseLeave={() => setIsContHover(false)}>

                <a href={url} target="_blank">{url}</a>
                <Tooltip text={url} hover={isContHover} parentRef={containerUrl}/>
            </div>
            <div className="link__cont --flex --wrap">{tags.map((tag, index) => {
                return <Tag key={`${id}-${index}`}
                            updateDisable={true} {...tag}
                            onClose={info => remove(tag.id)}
                        />
            })}</div>
          </div>
}

Link.propTypes = LinkPropType

export default connect(null, mapDispachToProps)(Link);