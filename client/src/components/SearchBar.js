import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar home-1">
      <div className="search">
        <form action="#">
          <input type="text" placeholder="Search Here ...." />
          <input type="submit" value="Search" className="btn-primary-style btn-2 hero-info-btn btn-3 btn-4" />
        </form>
      </div>
      <a href="javascript:void(0)" className="search-popup-close" onClick={() => console.log('Close search')}>
        <i className="fa-solid fa-xmark"></i>
      </a>
    </div>
  );
};

export default SearchBar;
