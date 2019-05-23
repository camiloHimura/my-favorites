import React from 'react';
import "./Content.css";

import Link from "../Link";
import Search from "../Search";
import Row from "../generals/Row";
import CreateLink from "../CreateLink";

class Content extends React.Component{

    render(){
        const data = Array.from({length: 5}, () => ({title: "This is a long Test", url: "https://mongoosejs.com/docs/connections.html"}));

        return  <section className="Content">
                   
                    <div className="contend">
                        <Row>{() => <Search style={{"width": "30%"}}/>}</Row>
                        <Row>{() => <CreateLink />}</Row>

                        {data.map((info, index) =>  <Row key={`${info.date}-${index}`}>
                                                        {() => <Link {...info}/>}
                                                    </Row>)}
                    </div>
                </section>
    }
}

export default Content ;