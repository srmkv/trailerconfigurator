// Footer.js
import React, { useEffect, useRef, useState } from 'react';
import MapPopup from './MapPopup'; // Убедитесь, что путь правильный
import './Footer.css'; // Импортируйте CSS-файл для стилей

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const mapContainerRef = useRef(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Создаём элемент script для Яндекс.Карты
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src =
      'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A7b2f61d0b4d4780d7cc745bfdb3c81c52d89016d17764ab52a7056b36cfa9733&amp;width=100%25&amp;height=100%25&amp;lang=ru_RU&amp;scroll=true';

    // Добавляем элемент script в контейнер карты
    mapContainerRef.current.appendChild(script);

    // Очистка карты при размонтировании компонента
    return () => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="contact" className="offer-area-home-1">
      <img
        src="assets/images/shep/bg-blur-shep-1.png"
        alt="VRE"
        className="offer-area-1-shep-1 blur-1"
      />
      <div className="container">
      <div className="title">
          <div className="sub-title">
            <p>Где купить?</p>
          </div>
          
        </div>
        <div className="footer-wrapper">
          <div className="row justify-content-between">
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
              <div className="footer-item-1">
                {/* Контейнер для Яндекс.Карты */}
                <div
                  id="yandex-map"
                  ref={mapContainerRef}
                  style={{
                    width: '100%',
                    height: '65vh', // Занимает всю высоту экрана
                   // filter: 'invert(90%) brightness(0.8)', // Применение фильтра для темной темы
                  }}
                ></div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                {/* Кнопка открытия попапа */}
                <button className="open-popup-button but-fut" onClick={handleOpenPopup}>
                  Открыть карту и контакты
                </button>

                {/* Контакты */}
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <span className="futer-cont">Москва и Московская область</span>
                <p className="futer-cont3">ВОЯЖАВТОТЕХ</p>
                <p className="futer-cont2">ул. Мневники, д. 1</p>
                <p className="futer-cont2">тел: +7(495)241-15-05</p>
                <p className="futer-cont2">моб.: +7(920)251-20-86</p>


                <p className="futer-cont3">ПРИЦЕПЫ СКОЛКОВО</p>
                <p className="futer-cont2">г.Москва, Сколковское шоссе 31, стр. 1, ТВК СпортХит, 1 этаж, павильон 28</p>
                <p className="futer-cont2">тел: +7-965-244-84-42</p>

                <p className="futer-cont3">LK-MOTO</p>
                <p className="futer-cont2">г.Мытищи Ярмарочная улица,с4Б,линия Д2</p>
                <p className="futer-cont2">тел: +7-929-974-69-29</p>

                <p className="futer-cont3">BRUTAL TOYS</p>
                <p className="futer-cont2">Посёлок дом отдыха «Успенское», 1-е Успенское шоссе, вл2с6</p>
                <p className="futer-cont2">тел: +7-800-222-24-84</p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <span className="futer-cont">Санкт-Петербург</span>
                <p className="futer-cont3">ПЕРВЫЙ ВЕТЕРР</p>
                <p className="futer-cont2">г.Санкт-Петербург, пр-кт Культуры, 41</p>
                <p className="futer-cont2">тел.: +7-812-372-65-41</p>

                <p className="futer-cont3">ПЕРВЫЙ ВЕТЕРР</p>
                <p className="futer-cont2">г.Санкт-Петербург,  ул. Типанова, 30</p>
                <p className="futer-cont2">тел.: +7-812-372-65-97</p>


                <span className="futer-cont">Казань</span>
                <p className="futer-cont3">DAREX-MOTO</p>
                <p className="futer-cont2">г.Казань, Оренбургский тракт, 160 к2, вход 10</p>
                <p className="futer-cont2">тел.: +7-843-244-82-19</p>


                <span className="futer-cont">Владимир</span>
                <p className="futer-cont3">КОРПОРАЦИЯ ПРИЦЕПОВ</p>
                <p className="futer-cont2">г.Владимир, ул.Ноябрьская, 131</p>
                <p className="futer-cont2">тел.: +7-920-626-10-33</p>


                <span className="futer-cont">Нижегородская область</span>
                <p className="futer-cont3">ВОЯЖАВТОТЕХ</p>
                <p className="futer-cont2">г.Павлово, ул.8-Марта, д.15В</p>
                <p className="futer-cont2">тел: +7-831-280-82-88</p>
                <p className="futer-cont2">тел: +7-904-918-33-88</p>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Рендерим попап, если isPopupOpen == true */}
      {isPopupOpen && <MapPopup onClose={handleClosePopup} />}
    </section>
  );
};

export default Footer;
