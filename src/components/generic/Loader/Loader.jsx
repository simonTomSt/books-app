import React from 'react';
import loader from './loader.png';
import './Loader.scss';
const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loading" className="loader__img" />
    </div>
  );
};

export default Loader;
