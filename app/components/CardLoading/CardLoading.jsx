import React from 'react';
import './CardLoading.css';

export function CardLoading() {
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

CardLoading.propTypes = {};

export default CardLoading;
