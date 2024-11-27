import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryButton.css';

const GalleryButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/gallery'); // Перенаправление на /gallery
  };

  return (
    
    <div className="centered-button-container">
      <button className="centered-button" onClick={handleClick}>
        Перейти в галерею
      </button>
    </div>
  );
};

export default GalleryButton;
