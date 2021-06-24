import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import './Tag.css';

import Icon from '../Icon';
import { updateTag } from '../../../state/actions';

const mapDispachToProps = (dispatch) => ({
  updateTag: (id: string, name: string) => dispatch(updateTag(id, name)),
});

export function Tag(props) {
  const inputEl = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const { color = '0396A6', onClose, name = '', updateTag, id, isUpdateDisable = false } = props;

  function activeEdit() {
    if (isUpdateDisable) {
      return;
    }
    setIsEdit(true);
  }

  function hideEdit() {
    setIsEdit(false);
  }

  function checkName(event) {
    if (event.key == 'Enter' && inputEl.current.value !== '') {
      updateTag(id, inputEl.current.value, color);
    }
  }

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
}

// Tag.propTypes = TagPropType;

export default connect(null, mapDispachToProps)(Tag);
