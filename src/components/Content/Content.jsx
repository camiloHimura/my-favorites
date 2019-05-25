import React, {useEffect} from 'react';
import "./Content.css";

import Link from "../Link";
import Search from "../Search";
import Row from "../generals/Row";
import CreateLink from "../CreateLink";

import {useStateValueCtx} from "../../context/Tags.contex";

function Content() {

    const [dataCtx, dispatchCtx] = useStateValueCtx();

    useEffect(() => {
        setTimeout(() => {
            const links = Array.from({length: 5}, () => ({title: "This is a long Test", url: "https://mongoosejs.com/docs/connections.html"}));
            dispatchCtx({ type: "addLinks", links});
        },1000)
    }, [])

    return  <section className="Content">                
                <div className="contend">
                    <Row className="--flexEnd">{() => <Search style={{"width": "30%"}}/>}</Row>
                    <Row>{() => <CreateLink />}</Row>

                    {dataCtx.links.map((info, index) =>  <Row key={`${info.date}-${index}`}>
                                                    {() => <Link {...info}/>}
                                                </Row>)}
                </div>
            </section>
}

export default Content;
