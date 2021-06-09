import React, { Dispatch, useRef } from 'react';
import './Card.css';

import Icon from '../generals/Icon';
import Tag from '../generals/Tag';
import Tooltip from '../generals/Tooltip';
import { removeTagLinkAsyncAction, removeLinkAsyncAction } from '../../state/actions';
import { iLink } from '../../interfaces';
import { useAppDispatch } from '../../hooks/redux';

const fakeText = `Donec in venenatis metus. Suspendisse potenti. Cras ultricies turpis sit amet massa suscipit, in egestas sapien finibus.`;

const Card: React.FC<iLink> = ({ id = '0', title, url, tags = [], description = fakeText }) => {
  const containerUrl = useRef<HTMLButtonElement>(null);
  const [isContHover, setIsContHover] = React.useState(false);

  const dispatchRemoveLink: Dispatch<any> = useAppDispatch();
  const dispatchRemoveTag: Dispatch<any> = useAppDispatch();
  const removeLink = () => dispatchRemoveLink(removeLinkAsyncAction(id as string));
  const removeTag = (tagId: string) => dispatchRemoveTag(removeTagLinkAsyncAction(id as string, tagId));

  const editLink = () => {
    // Todo edit link method backed
    console.log('editLink...', id);
  }

  return (
    <div className="card">
      <a className="linkTitle" href={url} target="_blank" data-test="link-url" rel="noreferrer">
        <h2 className="title" data-test="title">
          {title}
        </h2>
      </a>

      <div className="contDescription">
        <button
          className="description"
          ref={containerUrl}
          onMouseEnter={() => setIsContHover(true)}
          onMouseLeave={() => setIsContHover(false)}
          data-test="description"
        >
          {description}
        </button>
        <Tooltip
          text={description}
          calcHeight={true}
          hover={isContHover}
          parentRef={containerUrl}
          data-test="cp-tooltip"
        />
      </div>

      <div className="card__cont contTags --flex --wrap">
        {tags.map((tag, index) => (
          <Tag
            data-test="cp-tag"
            key={`${id}-${index}`}
            isUpdateDisable={true}
            onClose={() => removeTag(tag.id as string)}
            {...tag}
          />
        ))}
      </div>
      <div className="card_options --flex">
        <div className="loading">
          <Icon
            name="edit"
            onClick={editLink}
            className={'edit iconHover'}
            pointer={true}
            data-test="btn-edit"
          />
        </div>
        <div className="loading">
          <Icon
            name="close"
            onClick={removeLink}
            className={'close iconHover'}
            pointer={true}
            data-test="btn-remove"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
