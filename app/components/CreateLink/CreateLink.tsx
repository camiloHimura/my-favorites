import React, { useState, useEffect, Dispatch } from 'react';
import * as R from 'ramda';
import './CreateLink.css';

import TagList from '../generals/TagList';
import {
  addLinkAsyncAction,
  getAllTagsAsyncAction,
  setLsUrlAction,
  setLsTitleAction,
  setLsTagsAction,
  clearLsAction,
} from '../../state/actions';
import iCreateLink from '../../interfaces/iCreateLink';
import { RootState } from '../../state/store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { iNewLink } from '../../interfaces/iLink';
import { iTag } from '../../interfaces';
import Button from '../generals/Button';

type iInput = React.MutableRefObject<HTMLInputElement>;
type iInputEvent = React.ChangeEvent<HTMLInputElement>;

const selectTags = (state: RootState) => state.tags;
const selectLocalStorage = (state: RootState) => state.localStorage;
//todo Implement invalid toast
// const selectInvalidLink = (state: RootState) => state.validation.invalidLink;

const getTagsIds = (tags: iTag[]) => R.map(R.propOr('', 'id'), tags) as string[];
const setInvalidInput = (input: iInput) => {
  input?.current?.classList?.add('invalid');
  return false;
};

const removeInvalid = (event: iInputEvent) => event?.target?.classList?.remove('invalid');

const clearInput = (input: iInput) => (input.current.value = '');

const isInvalidText = (input: iInput) =>
  //Todo, the 'undefined' validation was added to make the test pass, find a better approach.
  !input?.current?.value || input?.current.value === 'undefined';

const isInputValid = R.ifElse(isInvalidText, setInvalidInput, R.T);

const isTitleAndUrlValid = (inputTitle, inputUrl) => {
  const isValidTitle = isInputValid(inputTitle);
  const isValidRrl = isInputValid(inputUrl);
  return isValidTitle && isValidRrl;
};

const CreateLink: React.FC<iCreateLink> = () => {
  const inputTitle = React.useRef<HTMLInputElement>(null);
  const inputUrl = React.useRef<HTMLInputElement>(null);
  const [clearList, setClearList] = useState(false);

  const tags = useAppSelector(selectTags);
  const lsLink = useAppSelector(selectLocalStorage);
  //todo Implement invalid toast
  // const isInvalidLink = useAppSelector(selectInvalidLink);
  const dispatchAddLink: Dispatch<any> = useAppDispatch();
  const dispatchGetAllTags: Dispatch<any> = useAppDispatch();
  const dispatchClearLs = useAppDispatch();
  const dispatchSetLsUrl = useAppDispatch();
  const dispatchSetLsTitle = useAppDispatch();
  const dispatchSetLsTags = useAppDispatch();

  const addLink = (link: iNewLink) => () => dispatchAddLink(addLinkAsyncAction(link));
  const getAllTags = () => dispatchGetAllTags(getAllTagsAsyncAction());
  const clearLs = () => dispatchClearLs(clearLsAction());
  const setLsUrl = (url: string) => dispatchSetLsUrl(setLsUrlAction(url));
  const setLsTitle = (url: string) => dispatchSetLsTitle(setLsTitleAction(url));
  const setLsTags = (tags: iTag[]) => dispatchSetLsTags(setLsTagsAction(tags));

  useEffect(() => {
    if (!tags?.length) {
      getAllTags();
    }

    inputUrl.current.value = lsLink?.url;
    inputTitle.current.value = lsLink?.title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const check = React.useCallback(
    () =>
      R.when(
        R.equals(true),
        addLinkAndClear(inputTitle, inputUrl, lsLink?.tags),
      )(isTitleAndUrlValid(inputTitle, inputUrl)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputTitle, inputUrl, lsLink?.tags],
  );

  const addLinkAndClear = (inputTitle: iInput, inputUrl: iInput, tags: iTag[] = []) =>
    R.compose(
      clearLs,
      addLink({
        title: inputTitle?.current?.value,
        url: inputUrl?.current?.value,
        tags: getTagsIds(tags),
      }),
      () => clearInput(inputUrl),
      () => clearInput(inputTitle),
      () => setClearList(true),
    );

  const updateTitle = () => setLsTitle(inputTitle?.current?.value);
  const updateUrl = () => setLsUrl(inputUrl?.current?.value);

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
        <Button
          text="Send"
          onClick={check}
          data-test="btn-send"
          className="createLink__send button"
        />
      </div>

      <TagList
        className="createLink__contTags --flex"
        options={tags}
        autoHide={false}
        clearList={clearList}
        data-test="cp-tagList"
        placeHolder="Add Tags"
        onTagsSaved={setLsTags}
        clearAfterSelecting={true}
        initialSavedTags={lsLink?.tags}
      />
    </div>
  );
};

export default CreateLink;
