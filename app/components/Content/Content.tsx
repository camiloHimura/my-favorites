import React, { Dispatch, useEffect } from 'react';
import './Content.css';

import { iContent, iLink, iTag } from '../../interfaces';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../state/store';
import { getAllLinksAction, getAllLinksByTagsAction, searchLinkAction } from '../../state/actions';
import CardLoading from '../CardLoading';
import Card from '../Card';
import Row from '../generals/Row';
import Search from '../Search';
import TagList from '../generals/TagList';

export enum eContent {
  tagListClass = 'tagList',
  tagListPlaceHolder = 'Filter By Tags',
}

const selectLinks = (state: RootState) => state.links;
const selectTags = (state: RootState) => state.tags;

const Content: React.FC<iContent> = ({ numLoadingCards = 2 }) => {
  const links = useAppSelector(selectLinks);
  const tags = useAppSelector(selectTags);
  const isLoadingLinks = links?.length == 0;

  const dispatchGetAllLinks: Dispatch<any> = useAppDispatch();
  const dispatchGetAllLinksByTags: Dispatch<any> = useAppDispatch();
  const dispatchSearchLink = useAppDispatch();

  const getAllLinks = () => dispatchGetAllLinks(getAllLinksAction());
  const searchLink = (text: string) => dispatchSearchLink(searchLinkAction(text));
  const getAllLinksByTags = (tagsIds: string) =>
    dispatchGetAllLinksByTags(getAllLinksByTagsAction(tagsIds));

  useEffect(() => {
    getAllLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsLoading = () =>
    Array.from({ length: numLoadingCards }, (_, index) => (
      <CardLoading key={`cardLoading-${index}`} data-test="cp-cardLoading" />
    ));

  const cardsLoaded = (links: iLink[]) =>
    links.map((info, index) => <Card key={`card-${index}`} {...info} data-test="cp-card" />);

  const getTagsIds = (selectedTags: iTag[] = []) =>
    selectedTags.reduce((accum, { id }): string => {
      return accum === '' ? (id as string) : `${accum},${id}`;
    }, '');

  const requestLinksByTags = (selectedTags: iTag[]) => getAllLinksByTags(getTagsIds(selectedTags));

  return (
    <section className="Content">
      <Row className="--flexColumn">
        <Search onSearchLink={searchLink} onGetAllLinks={getAllLinks} data-test="cp-search" />
        <TagList
          options={tags}
          autoHide={false}
          data-test="cp-tagList"
          clearAfterSelecting={true}
          className={eContent.tagListClass}
          placeHolder={eContent.tagListPlaceHolder}
          onTagsSaved={requestLinksByTags}
        />
      </Row>
      <Row className="--wrap --spaceEvenly">
        {isLoadingLinks ? cardsLoading() : cardsLoaded(links)}
      </Row>
    </section>
  );
};

export default Content;
