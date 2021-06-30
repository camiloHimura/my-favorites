import React, { useEffect, useState } from 'react';

import './Tooltip.css';

interface iProp {
  hover: boolean;
  text: string;
  parentRef: any;
  calcHeight: boolean;
}
const isOutOfBox =
  (calcHeight: boolean) =>
  ({ clientWidth, scrollWidth, clientHeight, scrollHeight }): boolean =>
    calcHeight ? clientHeight < scrollHeight : clientWidth < scrollWidth;

const Tooltip: React.FC<iProp> = (props) => {
  const [show, setShow] = useState(false);
  const [animation, setAnimation] = useState(false);
  const { text, parentRef, hover, calcHeight = false } = props;

  useEffect(() => {
    if (hover && isOutOfBox(calcHeight)(parentRef.current)) {
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
};

export default Tooltip;
