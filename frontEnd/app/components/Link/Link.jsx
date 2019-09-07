import React from 'react';
import {connect} from 'react-redux';
import {LinkPropType} from '../../propsTypes';
import './Link.css';

import Tag from '../generals/Tag';
import {removeTagLink} from "../../state/actions/";

const mapDispachToProps = dispatch => {
  return {
      removeTagLink: (linkId, tagId) => dispatch(removeTagLink(linkId, tagId)),
  }
}

function Link(props) {
  const {id = 0, title, url, tags = []} = props;

  function remove(tagId) {
      props.removeTagLink(props.id, tagId);
  }

  return  <div className="link">
              <div className="link__cont --title">{title}</div>
              <div className="link__cont --ellipsis"><a href={url} target="_blank">{url}</a></div>
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