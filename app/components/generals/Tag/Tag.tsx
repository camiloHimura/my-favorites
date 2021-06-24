import React, { useState, useRef, Dispatch } from 'react';
import './Tag.css';

import Icon from '../Icon';
import { updateTagAsyncAction } from '../../../state/actions';
import { iTag } from '../../../interfaces';
import { useAppDispatch } from '../../../hooks/redux';

interface iProps {
  id?: string | number;
  name: string;
  color?: string;
  isUpdateDisable?: boolean;
  onClose: (tag: iTag) => void;
}

const Tag: React.FC<iProps> = (props) => {
  const inputEl = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatchUpdateTag: Dispatch<any> = useAppDispatch();

  const updateTag = (id: string | number, name: string) =>
    dispatchUpdateTag(updateTagAsyncAction(id, name));

  const { color = '0396A6', onClose, name = '', id, isUpdateDisable = false } = props;

  const activeEdit = () => {
    if (isUpdateDisable) {
      return;
    }
    setIsEdit(true);
  };

  const hideEdit = () => setIsEdit(false);

  const checkName = (event) => {
    if (event.key == 'Enter' && inputEl.current.value !== '') {
      updateTag(id, inputEl.current.value);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="Tag --ellipsis"
      style={{ background: `#${color}` }}
      data-test="container"
      onBlur={hideEdit}
    >
      <Icon
        name="close"
        pointer={true}
        data-test="Icon"
        className={'close'}
        onClick={() => onClose({ id, name, color })}
      />
      {!isEdit && (
        <button
          className={isUpdateDisable ? 'noCursor' : ''}
          onDoubleClick={activeEdit}
          data-test="tag-name"
        >
          {name}
        </button>
      )}
      {isEdit && (
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className="editBox"
          placeholder={name}
          ref={inputEl}
          onKeyPress={checkName}
          data-test="input-edit"
        />
      )}
    </div>
  );
};

export default Tag;
