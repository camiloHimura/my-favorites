import React, { useState, Dispatch, useCallback } from 'react';
import * as R from 'ramda';
import * as Utils from '../../../utils';
import './Tag.css';

import Icon from '../Icon';
import { updateTagAsyncAction } from '../../../state/actions';
import { iInput, iTag } from '../../../interfaces';
import { useAppDispatch } from '../../../hooks/redux';
interface iProps {
  id?: string;
  name: string;
  color?: string;
  isUpdateDisable?: boolean;
  onClose: (tag: iTag) => void;
}

const isKeyEnterWithNoEmptyInput = R.both(Utils.isEnter, Utils.isNotEmptyInput);

const Tag: React.FC<iProps> = ({
  id,
  onClose,
  name = '',
  color = '0396A6',
  isUpdateDisable = false,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatchUpdateTag: Dispatch<any> = useAppDispatch();
  const updateTag = (id: string, name: string) => dispatchUpdateTag(updateTagAsyncAction(id, name));

  const tagClose = useCallback(() => {
    onClose({ id, name, color });
  }, [onClose, id, name, color]);

  const setUpdateModeIfAvailable = R.when(R.equals(true), setIsEdit);

  const hideEdit = () => setIsEdit(false);

  const checkName = R.when(isKeyEnterWithNoEmptyInput, (event: iInput) => {
    updateTag(id, Utils.getInputValue(event));
  });

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
          onDoubleClick={() => setUpdateModeIfAvailable(!isUpdateDisable)}
          data-test="tag-name"
        >
          {name}
        </button>
      )}
      {isEdit && (
        <input
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
