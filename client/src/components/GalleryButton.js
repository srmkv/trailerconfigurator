// GalleryButton.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';
import './GalleryButton.css';
import IndividualModal from './IndividualModal'; // Импортируем новый компонент модального окна

const GalleryButton = () => {
  const navigate = useNavigate();
  const [isC25ModalVisible, setIsC25ModalVisible] = useState(false);

  const handleNavigate = () => {
    navigate('/gallery'); // Перенаправление на /gallery
  };

  const showC25Modal = () => {
    setIsC25ModalVisible(true);
  };

  const handleC25ModalClose = () => {
    setIsC25ModalVisible(false);
  };

  return (
    <div className="centered-button-container">
      <button className="centered-button" onClick={handleNavigate}>
        Перейти в галерею
      </button>
      <button className="centered-button" onClick={showC25Modal} style={{ marginLeft: '10px' }}>
        Индивидуальное исполнение
      </button>

      {/* Интеграция нового модального окна */}
      <IndividualModal visible={isC25ModalVisible} onClose={handleC25ModalClose} />
    </div>
  );
};

export default GalleryButton;
