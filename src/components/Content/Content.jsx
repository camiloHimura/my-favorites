import React from 'react';
import "./Content.css";

import Row from "../Row";
import Search from "../Search";
import ItemInfo from "../ItemInfo";

class Content  extends React.Component{

    render(){
        const data = Array.from({length: 5}, () => ({date: "Monday 10 2:28 PM", origin: "Houston, TX, 33619", 
                                                    destination: "Atlanta, GA, 30123", price: "2500", num: "1"}));

        return  <section className="Content">
                   
                    <div className="contend">
                        <Row >
                            {() => <Search style={{"width": "30%"}}/>}
                        </Row>
                        <Row >
                            {() => <Search />}
                        </Row>

                        {data.map((info, index) =>  <Row key={`${info.date}-${index}`} icon="check_circle">
                                                        {() => <ItemInfo {...info}/>}
                                                    </Row>)}
                    </div>
                </section>
    }
}

export default Content ;