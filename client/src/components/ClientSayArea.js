import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Импорт компонентов Swiper
import { Navigation } from 'swiper'; // Импорт модуля Navigation

// Импорт стилей Swiper


// Импорт собственного CSS, если есть
import './ClientSayArea.css'; // Убедитесь, что путь корректный

const ClientSayArea = () => {
  return (
    <section id="say" className="client-say-area-home-3 client-say-area-home-1">
      
      <div className="container">
        <div className="client-say-title">
          <h3 className="font-size-1-24">Отзывы наших клиентов</h3>
        </div>
        <div className="client-say-wrapper">
          <Swiper
          
            spaceBetween={30} // Расстояние между слайдами
            slidesPerView={1} // Количество видимых слайдов
            loop={true} // Зацикливание слайдов
            className="client-say-home-3"
          >
            {/* Слайды отзывов */}
            <SwiperSlide>
              <div className="client-say-inner">
                <p class="font-size-1-24">
                  Крутой прицеп, и далее по тексту: <br />
                  ”текст текст текст текст текст текст текст <br />
                  текст текст текст текст текст”
                </p>
                <h5 className="font-size-1-18">Иван Иванов</h5>
                <span className="font-size-1-14 client-work-name">
                  г. Нижний Новгород
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="client-say-inner">
                <p class="font-size-1-24">
                  Крутой прицеп, и далее по тексту: <br />
                  ”текст текст текст текст текст текст текст <br />
                  текст текст текст текст текст”
                </p>
                <h5 className="font-size-1-18">Петр Петров</h5>
                <span className="font-size-1-14 client-work-name">
                  г. Москва
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="client-say-inner">
                <p class="font-size-1-24">
                  Крутой прицеп, и далее по тексту: <br />
                  ”текст текст текст текст текст текст текст <br />
                  текст текст текст текст текст”
                </p>
                <h5 className="font-size-1-18">Семен Смирнов</h5>
                <span className="font-size-1-14 client-work-name">
                  г. Норильск
                </span>
              </div>
            </SwiperSlide>
            {/* Добавьте дополнительные слайды по необходимости */}
          </Swiper>

          {/* Навигационные кнопки */}
     
        </div>
      </div>
    </section>
  );
};

export default ClientSayArea;
