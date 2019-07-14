import React, {useEffect} from 'react';
import {connect} from "react-redux";
import "./Content.css";

import Link from "../Link";
import Search from "../Search";
import Row from "../generals/Row";
import CreateLink from "../CreateLink";

import {useStateValueCtx} from "../../context/Tags.contex";
import {getLinks} from "../../utils/ServerRequest";

const mapStateToProps = state => {
    return {links: state.links}
}

function Content(props) {

    /* const [dataCtx, dispatchCtx] = useStateValueCtx(); */

    useEffect(() => {
        //requestLinks();
        console.log(props);
    }, [])
    
    async function requestLinks(){
        let links = await getLinks();
        /* dispatchCtx({type: "addLinks", links}); */
    }

    return  <section className="Content">                
                <div className="contend">
                    <Row className="--flexEnd">{() => <Search style={{"width": "30%"}}/>}</Row>
                    <Row>{() => <CreateLink />}</Row>

                    {props.links.map((info, index) =>  <Row key={`${info.date}-${index}`}>
                                                    {() => <Link {...info}/>}
                                                </Row>)}
                </div>
            </section>
}

export default connect(mapStateToProps)(Content);
