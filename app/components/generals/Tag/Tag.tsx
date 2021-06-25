import React, { useState, useRef, Dispatch, useCallback } from 'react';
import './Tag.css';

import Icon from '../Icon';
import { updateTagAsyncAction } from '../../../state/actions';
import { iTag } from '../../../interfaces';
import { useAppDispatch } from '../../../hooks/redux';

interface iProps {
  id?: string;
  name: string;
  color?: string;
  isUpdateDisable?: boolean;
  onClose: (tag: iTag) => void;
}

const Tag: React.FC<iProps> = ({
  id,
  onClose,
  name = '',
  color = '0396A6',
  isUpdateDisable = false,
}) => {
  const inputEl = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatchUpdateTag: Dispatch<any> = useAppDispatch();
  const updateTag = (id: string, name: string) => dispatchUpdateTag(updateTagAsyncAction(id, name));

  const tagClose = useCallback(() => {
    onClose({ id, name, color });
  }, [onClose, id, name, color]);

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
      <Icon name="close" pointer={true} data-test="Icon" className={'close'} onClick={tagClose} />
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
          ref={inputEl}
          placeholder={name}
          className="editBox"
          data-test="input-edit"
          onKeyPress={checkName}
        />
      )}
    </div>
  );
};

export default Tag;
