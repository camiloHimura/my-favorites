import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {LinkPropType} from "../../propsTypes";
import "./Content.css";

import Link from "../Link";
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

            {props.links.map((info, index) => <Row key={`${info.date}-${index}`}>
                                                <Link {...info}/>
                                              </Row>)}
          </section>
}

Content.propTypes = {
    getAllLinks: PropTypes.func,
    links: PropTypes.arrayOf(PropTypes.shape(LinkPropType)),
}

export default connect(mapStateToProps, mapDispachToProps)(Content);
