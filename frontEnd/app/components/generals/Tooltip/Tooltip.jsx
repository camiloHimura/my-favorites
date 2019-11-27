import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

import "./Tooltip.css";

function Tooltip (props){
  const {text, parentRef, hover} = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const {clientWidth, scrollWidth} = parentRef.current;
    if(hover && clientWidth < scrollWidth){
      setShow(true);
    }else{
      setShow(false);
    }
  }, [hover])

  if(!show) {return null}

  return  <div className="Tooltip">
              {text}
            </div>
}

Tooltip.propType = {
  test: PropTypes.string.isRequired,
  parentRef: PropTypes.any.isRequired,
};

export default Tooltip;
