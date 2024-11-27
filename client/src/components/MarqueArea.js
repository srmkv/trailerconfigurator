import React from 'react';

const MarqueArea = () => {
  return (
    <div id="marque" className="marque-area-home-3 marque-area-home-1">
      <img
        width="50%"
        src="assets/images/trailers/0024.webp"
        alt="VRE"
      />
      <div className="marque-1">
        {Array(30).fill('прицепы\u00A0').map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
      <div className="marque-1 marque-2">
        {Array(30).fill('VOYAGE\u00A0').map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
    </div>
  );
};

export default MarqueArea;
