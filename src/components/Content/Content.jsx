import React from 'react';
import "./Content.css"

import Nav from "../Nav/Nav";
import Row from "../Row/Row";
import Search from "../Search/Search";
import ItemInfo from "../ItemInfo/ItemInfo";

class Content  extends React.Component{

    state = {
        menu: [{name:"Home", icon:"home", selected: true},{name:"Messages", icon:"mail_outline"},
                {name:"Whishlist", icon:"star"}, {name:"Settings", icon:"settings"},
                {name:"My Account", icon:"person"}]
    }
    render(){
        const data = Array.from({length: 5}, () => ({date: "Monday 10 2:28 PM", origin: "Houston, TX, 33619", 
                                                    destination: "Atlanta, GA, 30123", price: "2500", num: "1"}));

        return  <section className="Content">
                    <Nav items={this.state.menu}/>
                    <div className="contend">
                        <Row icon="check_circle">
                            {() => <Search style={{"width": "30%"}}/>}
                        </Row>

                        {data.map((info, index) =>  <Row key={`${info.date}-${index}`} icon="check_circle">
                                                        {() => <ItemInfo {...info}/>}
                                                    </Row>)}
                    </div>
                </section>
    }
}

export default Content ;