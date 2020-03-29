import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import "./Tooltip.css";

function Tooltip (props){
  const [show, setShow] = useState(false);
  const [animation, setAnimation] = useState(false);
  const {text, parentRef, hover, calcHeight = false} = props;

  useEffect(() => {
    const {clientWidth, scrollWidth, clientHeight, scrollHeight, } = parentRef.current;
    const isOutOfBox = calcHeight? clientHeight < scrollHeight: clientWidth < scrollWidth;

    if(hover && isOutOfBox){
      setShow(true);
      setTimeout(() => setAnimation(true), 10);
    }else{
      setShow(false);
    }
  }, [hover])

  if(!show) {return null}

  return  <div className={`Tooltip ${animation? "show": ""}`}> {text} </div>
}

Tooltip.propType = {
  test: PropTypes.string.isRequired,
  parentRef: PropTypes.any.isRequired,
};

export default Tooltip;
