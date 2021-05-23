import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Tooltip.css';

function Tooltip(props) {
  const [show, setShow] = useState(false);
  const [animation, setAnimation] = useState(false);
  const { text, parentRef, hover, calcHeight = false } = props;

  useEffect(() => {
    const { clientWidth, scrollWidth, clientHeight, scrollHeight } = parentRef.current;
    const isOutOfBox = calcHeight ? clientHeight < scrollHeight : clientWidth < scrollWidth;

    if (hover && isOutOfBox) {
      setShow(true);
      setTimeout(() => setAnimation(true), 10);
    } else {
      setShow(false);
    }
  }, [calcHeight, hover, parentRef]);

  if (!show) {
    return null;
  }

  return <div className={`Tooltip ${animation ? 'show' : ''}`}> {text} </div>;
}

Tooltip.propTypes = {
  hover: PropTypes.bool.isRequired,
  test: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  parentRef: PropTypes.any.isRequired,
  calcHeight: PropTypes.bool.isRequired,
};

export default Tooltip;
