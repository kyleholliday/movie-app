import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      // Navigate to the search results page with the search query
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="top-navbar-shadow"></div>
      <nav className="navbar navbar-expand-md">
        <div className="container">
          <h1>
            <a href="/" className="navbar-brand">
              BIJOU
            </a>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerMain"
            aria-controls="navbarTogglerMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerMain">
            <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="navlinks" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlinks" to="/now-playing">
                  Now Playing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlinks" to="/upcoming">
                  Upcoming
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="navlinks" to="/tv-trending">
                  Trending TV
                </NavLink>
              </li>
            </ul>
            <div className="search-holder">
              <input
                type="text"
                placeholder="Search Movies and TV"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="form-control me-2"
                aria-label="Search Movies and TV"
              />
              <button className="btn search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default React.memo(Navbar);