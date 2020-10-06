import React from 'react';
import { Link } from 'react-router-dom';
import './Opening.scss';
const Opening = () => {
  return (
    <section className="opening">
      <div className="opening__content">
        <h1 className="opening__header">Find the book you are looking for! </h1>
        <Link to="/search-book">
          <button className="opening__btn">Search book</button>
        </Link>
      </div>
    </section>
  );
};

export default Opening;
