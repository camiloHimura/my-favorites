import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TagPropType } from '../../propsTypes';
import './CreateLink.css';

import TagList from '../generals/TagList';
import {
  addLink,
  invalidLink,
  getAllTags,
  setLsUrlAction,
  setLsTitleAction,
  setLsTagsAction,
  clearLsAction,
} from '../../state/actions';

const mapStateToProps = (state) => ({
  tags: state.tags,
  localStorage: state.localStorage,
  isInvalidLink: state.invalidLink,
});

const mapDispachToProps = (dispatch) => ({
  addLink: (info) => dispatch(addLink(info)),
  invalidLink: () => dispatch(invalidLink()),
  getAllTags: () => dispatch(getAllTags()),
  clearLs: () => dispatch(clearLsAction()),
  setLsUrl: (url) => dispatch(setLsUrlAction(url)),
  setLsTitle: (url) => dispatch(setLsTitleAction(url)),
  setLsTagsAction: (tags) => dispatch(setLsTagsAction(tags)),
});

export function CreateLink(props) {
  const inputTitle = useRef();
  const inputUrl = useRef();
  const [clearList, setClearList] = useState(false);

  useEffect(() => {
    if (!props.tags.length) {
      props.getAllTags();
    }

    inputUrl.current.value = props.localStorage.url;
    inputTitle.current.value = props.localStorage.title;
  }, []);

  function removeInvalid(event) {
    event.target.classList.remove('invalid');
  }

  function check() {
    let isValid = true;
    if (inputTitle.current.value === '') {
      inputTitle.current.classList.add('invalid');
      isValid = false;
    }

    if (inputUrl.current.value === '') {
      inputUrl.current.classList.add('invalid');
      isValid = false;
    }

    if (isValid) {
      props.addLink({
        title: inputTitle.current.value,
        url: inputUrl.current.value,
        tags: props.localStorage.tags.map((tag) => tag.id),
      });
      clear();
    }
  }

  function clear() {
    inputUrl.current.value = '';
    inputTitle.current.value = '';
    setClearList(true);
    props.clearLs();
  }

  function updateTitle() {
    props.setLsTitle(inputTitle.current.value);
  }

  function updateUrl() {
    props.setLsUrl(inputUrl.current.value);
  }

  return (
    <div className="createLink">
      <h2>Create Link</h2>

      <input
        placeholder="Title"
        ref={inputTitle}
        data-test="inp-title"
        onChange={updateTitle}
        onFocus={removeInvalid}
        className="createLink__contInputs__title"
      />
      <div className="--flex">
        <input
          placeholder="Url"
          ref={inputUrl}
          data-test="inp-url"
          onChange={updateUrl}
          onFocus={removeInvalid}
          className="createLink__contInputs__url"
        />
        <button className="createLink__send" type="button" onClick={check} data-test="btn-send">
          Send
        </button>
      </div>

      <TagList
        className="createLink__contTags --flex"
        autoHide={false}
        propertyFilter="name"
        options={props.tags}
        data-test="cp-tagList"
        placeHolder="Add Tags"
        clearList={clearList}
        clearAfterSelecting={true}
        onTagsSaved={props.setLsTagsAction}
        initialSavedTags={props.localStorage.tags}
      />
    </div>
  );
}

CreateLink.propTypes = {
  addLink: PropTypes.func,
  localStorage: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape(TagPropType)),
};

export default connect(mapStateToProps, mapDispachToProps)(CreateLink);
