import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {CardPropType} from "../../propsTypes";
import "./Content.css";

import Card from "../Card";
import Search from "../Search";
import Row from "../generals/Row";
import CreateLink from "../CreateLink";
import CardLoading from "../CardLoading";

import {getAllLinks} from "../../state/actions";

const mapStateToProps = state => {
        return {links: state.links}
      }

const mapDispachToProps = dispatch => ({
        getAllLinks: () => dispatch(getAllLinks()),
      })
      
export function Content(props) {
  const {links, numLoadingCards = 9} = props;
  //console.log("Content links", links)
  useEffect(() => {
    console.log('props.getAllLinks()')
      props.getAllLinks();
  }, [])

  const isLoadingLinks = links && links.length == 0;
  
  function cardsLoading(){
    return Array.from({length: numLoadingCards})
              .map((_, index) => <CardLoading key={`cardLoading-${index}`}/>)
  }

  function cardsLoaded(links){
    return links.map((info, index) => <Card key={`card-${index}`} {...info}/>)
  }

  return  <section className="Content">                
            <Row className="--flexEnd"><Search style={{"width": "30%"}}/></Row>
            <Row><CreateLink/></Row>
            
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
