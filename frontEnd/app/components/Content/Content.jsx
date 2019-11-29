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

const mapDispachToProps = dispatch => {
        return {
          getAllLinks: () => dispatch(getAllLinks()),
        }
      }

function Content(props) {
  useEffect(() => {
      props.getAllLinks();
  }, [])

  const isLoadingLinks = props.links && props.links.length == 0;

  function cardsLoading(){
    return Array.from({length: 9})
              .map((_, index) => <CardLoading key={`cardLoading-${index}`}/>)
  }

  function cardsLoaded(links){
    return links.map((info, index) => <Card key={`card-${index}`} {...info}/>)
  }

  return  <section className="Content">                
            <Row className="--flexEnd"><Search style={{"width": "30%"}}/></Row>
            <Row><CreateLink/></Row>
            
            <Row className="--wrap --spaceEvenly">
              {isLoadingLinks? cardsLoading(): cardsLoaded(props.links)}
            </Row>
          </section>
}

Content.propTypes = {
    getAllLinks: PropTypes.func,
    links: PropTypes.arrayOf(PropTypes.shape(CardPropType)),
}

export default connect(mapStateToProps, mapDispachToProps)(Content);
