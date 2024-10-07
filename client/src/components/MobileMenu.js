import React from 'react';

const MobileMenu = () => {
  return (
    <div className="nft-mobile-menu">
      <button className="close-menu"><i className="fa-solid fa-xmark"></i></button>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        {/* Other menu items */}
      </ul>
    </div>
  );
};

export default MobileMenu;
