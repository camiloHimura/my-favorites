import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {LinkPropType} from "../../propsTypes";
import "./Content.css";

import Card from "../Card";
import Search from "../Search";
import Row from "../generals/Row";
import CreateLink from "../CreateLink";

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

  return  <section className="Content">                
            <Row className="--flexEnd"><Search style={{"width": "30%"}}/></Row>
            <Row><CreateLink/></Row>
            <Row className="--wrap --spaceEvenly">
              {props.links.map((info, index) => <Card key={`card-${index}`} {...info}/>)}
            </Row>
          </section>
}

Content.propTypes = {
    getAllLinks: PropTypes.func,
    links: PropTypes.arrayOf(PropTypes.shape(LinkPropType)),
}

export default connect(mapStateToProps, mapDispachToProps)(Content);
