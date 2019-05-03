import React from 'react';
import "./ItemInfo.css";
import Icon from "../Icon/Icon";

class ItemInfo  extends React.Component{

    render(){
        const {date, origin, destination, price, num} = this.props;

        return  <div className="itemInfo">
                    <div>{date}</div>
                    <div className="itemInfo__route">
                        {origin}
                            <Icon name="expand_more" color="orange" style={{fontSize: "60px"}}/>
                        {destination}
                    </div>
                    <Icon name="local_shipping" style={{fontSize: "74px", transform: "scaleX(-1)"}}/>
                    <div className="itemInfo__price">${price}</div>
                    <div className="itemInfo__num">{num}</div>
                    <Icon name="more_vert" pointer={true}/>
                </div>
    }
}

export default ItemInfo ;