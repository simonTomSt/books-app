import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
const Nav = () => {
  return (
    <nav className="navbar">
      <Link className="navbar__link" to="/">
        Home{' '}
      </Link>{' '}
      <Link className="navbar__link" to="/favourites">
        Favourites{' '}
      </Link>{' '}
      <Link className="navbar__link navbar__link--login" to="login" as="button">
        Log in{' '}
      </Link>{' '}
    </nav>
  );
};

export default Nav;
