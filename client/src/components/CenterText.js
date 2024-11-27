import React from 'react';
import './CenterText.css'; // Импортируем CSS файл для стилей

const CenterText = () => {
  return (
    <div className="center-text-container">
      <p className="center-text">
        Общество с ограниченной ответственностью «ВОЯЖАВТОТЕХ»
        <br />
        ИНН 5252035709 КПП 525201001
      </p>
    </div>
  );
};

export default CenterText;
