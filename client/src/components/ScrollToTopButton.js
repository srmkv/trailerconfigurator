import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to show or hide the button based on the scroll position
  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Add scroll event listener when component is mounted
    window.addEventListener('scroll', toggleVisibility);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      id="progress"
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'grid' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'conic-gradient(#CCFF00 50%, #CCDEFF 50%)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: '1000',
      }}
    >
      <span id="progress-value">
        <i className="fa-solid fa-arrow-up" style={{ color: '#fff', fontSize: '24px' }}></i>
      </span>
    </div>
  );
};

export default ScrollToTopButton;
