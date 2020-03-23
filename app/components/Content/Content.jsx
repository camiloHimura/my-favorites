import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {CardPropType} from "../../propsTypes";
import "./Content.css";

import Card from "../Card";
import Search from "../Search";
import Row from "../generals/Row";
import CardLoading from "../CardLoading";
import TagList from "../generals/TagList";

import {getAllLinks, getAllLinksByTags, searchLinkAction} from "../../state/actions";

const mapStateToProps = state => ({
  tags: state.tags,
  links: state.links,
})

const mapDispachToProps = dispatch => ({
  getAllLinks: () => dispatch(getAllLinks()),
  getAllLinksByTags: tags => dispatch(getAllLinksByTags(tags)),
  searchLink: text => dispatch(searchLinkAction(text)),
})
      
export function Content(props) {
  const {links = [], numLoadingCards = 9, searchLink, getAllLinks, getAllLinksByTags, tags} = props;

  useEffect(() => {
    getAllLinks();
  }, [])

  const isLoadingLinks = links && links.length == 0;
  function cardsLoading(){
    return Array.from({length: numLoadingCards})
              .map((_, index) => <CardLoading key={`cardLoading-${index}`}/>)
  }

  function cardsLoaded(links){
    return links.map((info, index) => <Card key={`card-${index}`} {...info}/>)
  }

  function formatTags(selectedTags = []){
    const formatted = selectedTags.reduce((accum, {id}) => {
                        if(accum === ''){ return id }
                        return `${accum},${id}`
                      }, '')
    requestLinksByTags(formatted);
  }
  
  function requestLinksByTags(tagsIds){
    if(typeof tagsIds !== 'string' || tagsIds.startsWith(',') || tagsIds.endsWith(",")){
      //todo add error hander
      console.error('invalid format');
      return;
    }

    getAllLinksByTags(tagsIds)
  }

  return  <section className="Content">
            <Row className="--flexColumn">
              <Search links={links} searchLink={searchLink} getAllLinks={getAllLinks}/>
              <TagList
                tags={tags} 
                autoHide={false}
                className="tagList"
                propertyFilter="name"
                clearAfterSelecting={true}
                placeHolder="Filter By Tags"
                onTagsSaved={formatTags}
              />
            </Row>
            <Row className="--wrap --spaceEvenly">
              {isLoadingLinks? cardsLoading(): cardsLoaded(links)}
            </Row>
          </section>
}

Content.propTypes = {
    getAllLinks: PropTypes.func,
    links: PropTypes.arrayOf(PropTypes.shape(CardPropType)),
}

export default connect(mapStateToProps, mapDispachToProps)(Content);
