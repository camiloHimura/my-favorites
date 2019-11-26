import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import "./Tooltip.css";

function Tooltip (props){
    const {test, parentRef, hover} = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
      const {clientWidth, scrollWidth} = parentRef.current;
      console.log("parentRef", clientWidth, scrollWidth);
      if(hover && clientWidth < scrollWidth){
        setShow(true);
        console.log("show", true);
      }else{
        setShow(false);
        console.log("show", false);
      }
    }, [hover])

    function checkOver(event){
      console.log("event", event)
    }

    if(!show) {return null}

    return  <div>
              I'm Tooltip
            </div>
}

Tooltip.propType = {
  test: PropTypes.string.isRequired,
  parentRef: PropTypes.any.isRequired,
};

export default Tooltip;
