import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './TagBox.css';

import Tag from '../generals/Tag';
import Board from '../generals/Board';
import { getAllTagsAsyncAction, addTag, removeTag } from '../../state/actions';

const mapStateToProps = (state) => ({
  tags: state.tags,
  invalidTag: state.validation.invalidTag,
});

const mapDispachToProps = (dispatch) => ({
  addTag: (info) => dispatch(addTag(info)),
  removeTag: (id) => dispatch(removeTag(id)),
  getAllTags: () => dispatch(getAllTagsAsyncAction()),
});

export function TagBox({ tags, getAllTags, addTag, removeTag }) {
  useEffect(() => {
    if (!tags.length) {
      getAllTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="TagBox">
      <h2 className="title">Current Tags</h2>
      <div className="TagBox__container__tags">
        <Board
          isWrap={true}
          options={tags}
          className="boardTags"
          setOptions={addTag}
          placeHolder="Create Tag"
          Component={(internalProps) => (
            <Tag {...internalProps} onClose={() => removeTag(internalProps.id)} />
          )}
        />
        {/*props.invalidTag && "Type a valid Tag"*/}
      </div>
    </section>
  );
}

/* TagBox.propTypes = {
  invalidTag: PropTypes.bool,
  removeTag: PropTypes.func,
  addTag: PropTypes.func,
  getAllTags: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape(TagPropType)),
}; */

export default connect(mapStateToProps, mapDispachToProps)(TagBox);
