import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {CardPropType} from '../../propsTypes';
import './Card.css';

import Icon from '../generals/Icon';
import Tag from '../generals/Tag';
import Tooltip from '../generals/Tooltip';
import {removeTagLink, removeLink} from "../../state/actions";

const mapDispachToProps = dispatch => ({
    removeLink: (linkId) => dispatch(removeLink(linkId)),
    removeTagLink: (linkId, tagId) => dispatch(removeTagLink(linkId, tagId)),
  })

const fakeText = `Donec in venenatis metus. Suspendisse potenti. Cras ultricies turpis sit amet massa suscipit, in egestas sapien finibus.`;

export function Card(props) {
  const {id = 0, title, url, tags = [], description = fakeText} = props;
  const containerUrl = useRef(null);
  const [isContHover, setIsContHover] = useState(false);

  function removeTag(tagId) {
    props.removeTagLink(props.id, tagId);
  }
  
  function removeLink() {
    console.log("cardId", props.id)
    props.removeLink(props.id);
  }

  return  <div className="card">
            <a className="linkTitle" href={url} target="_blank">
              <h2 className="title">{title}</h2>
            </a>

            <div className="contDescription">
              <p className="description" ref={containerUrl} onMouseEnter={() => setIsContHover(true)} onMouseLeave={() => setIsContHover(false)}>
                {description}
              </p>
              <Tooltip text={description} calcHeight={true} hover={isContHover} parentRef={containerUrl}/>
            </div>

            <div className="card__cont contTags --flex --wrap">{
              tags.map((tag, index) => <Tag key={`${id}-${index}`}
                                            updateDisable={true} {...tag}
                                            onClose={() => removeTag(tag.id)}
                                        />
              )}
            </div>
            <div className="card_options --flex">
              <div className="loading">
                <Icon name="edit" onClick={removeLink} className={"edit iconHover"} pointer={true}/>
              </div>
              <div className="loading">
                <Icon name="close" onClick={removeLink} className={"close iconHover"} pointer={true}/>
              </div>
            </div>
          </div>
}

Card.propTypes = CardPropType

export default connect(null, mapDispachToProps)(Card);
