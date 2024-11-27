// MapPopup.js
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
//import './MapPopup.css'; // Создайте отдельный CSS-файл для стилей попапа

const MapPopup = ({ onClose }) => {
  const popupMapContainerRef = useRef(null);

  useEffect(() => {
    if (!popupMapContainerRef.current) return;

    // Создаем элемент script для Яндекс.Карты
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src =
      'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A17f5b0ca453932905e6e901922269c99bb260cf01bee7558fd6a409312362262&amp;height=100%25&amp;lang=ru_RU&amp;scroll=true';

    // Добавляем элемент script в контейнер карты
    popupMapContainerRef.current.appendChild(script);

    // Очистка карты при размонтировании компонента
    return () => {
      if (popupMapContainerRef.current) {
        popupMapContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup-content-f">
      <div className="container">
        <button className="popup-close-button" onClick={onClose}>
          &times;
        </button>
        {/* Контакты внутри попапа */}
         <div className="pop-item-3 row">
              
                {/* Контакты */}
               
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <span className="pop-cont">г.Москва, ул.Мнёвники, д.1</span>
                  <p className="pop-cont2">продажи, сервис, доставка</p>
                  <p className="pop-cont2">тел: +7(495)241-15-05</p>
                  <p className="pop-cont2">моб.: +7(950)920-45-84</p>
                  <p className="pop-cont2">voyageautotech@yandex.ru</p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <span className="pop-cont">г.Павлово, Нижегородская область</span>
                  <p className="pop-cont2">ул.8-е Марта, д.15В</p>
                  <p className="pop-cont2">производство, продажи, сервис, доставка</p>
                  <p className="pop-cont2">тел: +7(831)280-82-88</p>
                  <p className="pop-cont2">моб.: +7(904)918-33-88 </p>
                  <p className="pop-cont2">zavodvat@yandex.ru </p>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <span className="pop-cont">Вопросы сотрудничества: </span>
                  <p className="pop-cont2">тел: +7(951)908-76-78 </p>
                </div>
                
              
             </div>
        </div>

        <div
          id="popup-yandex-map"
          ref={popupMapContainerRef}
          style={{
            width: '100%',
            height: '400px',
           
          }}
        ></div>
        
      </div>
    </div>,
    document.body
  );
};

export default MapPopup;
