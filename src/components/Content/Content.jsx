import React from 'react';
import "./Content.css"

import Nav from "../Nav/Nav";
import Row from "../Row/Row";
import Search from "../Search/Search";

class Content  extends React.Component{

    state = {
        menu: [{name:"Home", icon:"home", selected: true},{name:"Messages", icon:"mail_outline"},
                {name:"Whishlist", icon:"star"}, {name:"Settings", icon:"settings"},
                {name:"My Account", icon:"person"}]
    }
    render(){
        return  <section className="Content">
                    <Nav items={this.state.menu}/>
                    <div className="contend">
                        <Row icon="check_circle">
                            {() => <Search style={{"width": "30%"}}/>}
                        </Row>
                        <Row icon="check_circle">
                            {() => <div>Contend</div>}
                        </Row>
                        <Row icon="check_circle">
                            {() => <div>Contend</div>}
                        </Row>
                        <Row icon="check_circle">
                            {() => <div>Contend</div>}
                        </Row>
                        <Row icon="check_circle">
                            {() => <div>Contend</div>}
                        </Row>
                    </div>

                </section>
    }
}

export default Content ;