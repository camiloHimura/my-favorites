import React from 'react';
import './CardLoading.css';

const CardLoading: React.FC = () => {
  return (
    <div className="cardLoading">
      <div className="cardLoading__title"></div>

      <div className="cardLoading__description"></div>

      <div className="cardLoading__tags">
        <div className="cardLoading__tags__tag"></div>
        <div className="cardLoading__tags__tag"></div>
        <div className="cardLoading__tags__tag"></div>
        <div className="cardLoading__tags__tag"></div>
      </div>
    </div>
  );
}

export default CardLoading;
