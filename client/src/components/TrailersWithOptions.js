import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, message as AntMessage, Select } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import './TrailersWithOptions.css';

const { Option } = Select;

// Базовый URL API
const baseURL = "http://192.168.0.149:5000/";

// Определение доступных цветов и соответствующих полей изображений
const colorsList = [
  { label: 'Белый', front: 'FrontImg', back: 'BackImg' },
  { label: 'Зеленый', front: 'FrontImgGreen', back: 'BackImgGreen' },
  { label: 'Изумрудный', front: 'FrontImgIzu', back: 'BackImgIzu' },
  { label: 'Красный', front: 'FrontImgRed', back: 'BackImgRed' },
  { label: 'Серый', front: 'FrontImgGray', back: 'BackImgGray' },
  { label: 'Синий', front: 'FrontImgBlue', back: 'BackImgBlue' },
  { label: 'Хакки', front: 'FrontImgHaki', back: 'BackImgHaki' },
  { label: 'Черный', front: 'FrontImgBlack', back: 'BackImgBlack' },
];

// Функция для получения полей изображений на основе выбранного цвета
const getColorFields = (colorLabel) => {
  const color = colorsList.find(c => c.label === colorLabel);
  return color ? { front: color.front, back: color.back } : { front: 'FrontImg', back: 'BackImg' };
};

const TrailersWithOptions = () => {
  const [trailers, setTrailers] = useState([]);
  const [options, setOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [trailerPrices, setTrailerPrices] = useState({});
  const [activeTab, setActiveTab] = useState('');
  
  // Новое состояние для выбранных цветов трейлеров
  const [selectedColors, setSelectedColors] = useState({});

  // Функция для получения списка трейлеров
  const fetchTrailers = async () => {
    try {
      const response = await axios.get(`${baseURL}api/trailer/getAll`);
      const { status, data } = response.data;
      if (status) {
        setTrailers(data);
        const trailersWithPrices = {};
        const initialColors = {};

        // Инициализация цен и выбранных цветов для каждого трейлера
        data.forEach(trailer => {
          trailersWithPrices[trailer._id] = parseFloat(trailer.Price) || 0;
          initialColors[trailer._id] = 'Белый'; // Установка цвета по умолчанию
          fetchOptionsForTrailer(trailer._id);
        });

        setTrailerPrices(trailersWithPrices);
        setSelectedColors(initialColors);

        if (data.length > 0) {
          setActiveTab(`v-pills-${data[0]._id}`);
        }
      } else {
        setTrailers([]);
      }
    } catch (error) {
      console.error('Error fetching trailers:', error);
      AntMessage.error('Ошибка при получении прицепов.');
    }
  };

  // Функция для получения опций конкретного трейлера
  const fetchOptionsForTrailer = async (trailerId) => {
    try {
      const response = await axios.get(`${baseURL}api/options/getAll`, {
        params: { trailerId }
      });
      const { status, data } = response.data;
      if (status) {
        // Преобразуем position в число и сортируем по возрастанию
        const sortedOptions = data
          .map(option => ({ ...option, position: Number(option.position) }))
          .sort((a, b) => a.position - b.position);
        setOptions(prev => ({ ...prev, [trailerId]: sortedOptions }));
      } else {
        setOptions(prev => ({ ...prev, [trailerId]: [] }));
      }
    } catch (error) {
      console.error('Error fetching options for trailer:', error);
      AntMessage.error('Ошибка при получении опций.');
    }
  };

  // Обработка изменения опций
  const handleOptionChange = (trailerId, optionId, price, isChecked) => {
    setSelectedOptions(prev => ({
      ...prev,
      [trailerId]: {
        ...(prev[trailerId] || {}),
        [optionId]: isChecked
      }
    }));

    setTrailerPrices(prev => {
      const currentPrice = prev[trailerId];
      const newPrice = isChecked
        ? currentPrice + parseFloat(price)
        : currentPrice - parseFloat(price);

      return {
        ...prev,
        [trailerId]: Math.round(newPrice)
      };
    });
  };

  // Обработка изменения цвета трейлера
  const handleColorChange = (trailerId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [trailerId]: color
    }));

    // Опционально: можно обновить цену, если цвет влияет на цену
    // Здесь просто сбрасываем цену к базовой цене трейлера
    const trailer = trailers.find(t => t._id === trailerId);
    if (trailer) {
      setTrailerPrices(prev => ({
        ...prev,
        [trailerId]: parseFloat(trailer.Price) || 0
      }));
    }
  };

  // Функция для обновления списка трейлеров после изменений
  const onUpdateList = () => {
    setActiveTab('');
    setSelectedColors({});
    setSelectedOptions({});
    setTrailerPrices({});
    fetchTrailers();
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

  return (
    <section id="calculator" className="offer-area-home-1">
      <img
        src="assets/images/shep/bg-blur-shep-1.png"
        alt="Background Blur"
        className="offer-area-1-shep-1 blur-1"
      />
      <div className="container-calk">
        <div className="title">
          <div className="sub-title">
            <p>Калькулятор</p>
          </div>
          <div className="main-title">
            <h3 className="split-collab">
              Собери свой прицеп
              <span>
                <img
                  src="assets/images/shep/text-shep-1.png"
                  alt="Text Shep"
                />
              </span>
            </h3>
          </div>
        </div>
        <div className="offer-wrapper">
          <div className="d-flex align-items-start">
            <div className="nav flex-column nav-pills me-2 col-xl-2 col-lg-6 col-md-12 d-none d-lg-block" id="v-pills-tab" role="tablist" aria-orientation="vertical">
  {trailers.map(trailer => (
    <button
      key={trailer._id}
      className={`nav-link ${activeTab === `v-pills-${trailer._id}` ? 'active' : ''}`}
      id={`v-pills-${trailer._id}-tab`}
      type="button"
      role="tab"
      aria-controls={`v-pills-${trailer._id}`}
      aria-selected={activeTab === `v-pills-${trailer._id}`}
      onClick={() => setActiveTab(`v-pills-${trailer._id}`)}
    >
      <img
        src={`${trailer.FrontImg}`}
        width="300px"
        alt={trailer.Name}
      />
      <h4 style={{ color: '#fff', textAlign: 'center' }}>{trailer.Name}</h4>
    </button>
  ))}
</div>

{/* Добавляем слайдер для мобильных устройств */}
<div className="d-lg-none">
  <Swiper
    spaceBetween={10}  // Расстояние между слайдами
    slidesPerView={1.2} // Показываем немного следующего слайда для эстетики
    centeredSlides={true} // Центрируем слайды
    breakpoints={{
      // Настраиваем количество видимых слайдов в зависимости от ширины экрана
      320: { slidesPerView: 2, spaceBetween: 10 },  // Для мобильных устройств
      480: { slidesPerView: 2, spaceBetween: 10 }, // Для немного более широких экранов
      640: { slidesPerView: 2, spaceBetween: 10 },  // Для планшетов и небольших экранов
    }}
  >
    {trailers.map(trailer => (
      <SwiperSlide key={trailer._id}>
        <button
          className={`nav-link ${activeTab === `v-pills-${trailer._id}` ? 'active' : ''}`}
          id={`v-pills-${trailer._id}-tab`}
          type="button"
          role="tab"
          aria-controls={`v-pills-${trailer._id}`}
          aria-selected={activeTab === `v-pills-${trailer._id}`}
          onClick={() => setActiveTab(`v-pills-${trailer._id}`)}
          style={{ border: 'none', background: 'transparent', width: '100%' }}
        >
          <img
            src={`${trailer.FrontImg}`}
            alt={trailer.Name}
            style={{ width: '100%', height: 'auto', maxWidth: '300px', margin: '0 auto' }} // Задаем максимальную ширину и авто высоту
          />
          <h4 style={{ color: '#fff', textAlign: 'center', fontSize: '18px', marginTop: '10px' }}>
            {trailer.Name}
          </h4>
        </button>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


            <div
              className="tab-content col-xl-10 col-lg-6 col-md-12"
              id="v-pills-tabContent"
            >
              {trailers.map(trailer => {
                const selectedColor = selectedColors[trailer._id] || 'Белый';
                const colorFields = getColorFields(selectedColor);
                return (
                  <div
                    key={trailer._id}
                    className={`tab-pane fade ${activeTab === `v-pills-${trailer._id}` ? 'show active' : ''}`}
                    id={`v-pills-${trailer._id}`}
                    role="tabpanel"
                    aria-labelledby={`v-pills-${trailer._id}-tab`}
                  >
                    <div className="row justify-content-between">
                      <div className="col-xl-8 col-lg-6 col-md-12">
                        <div className="image-container">
                          {/* Блок для переднего вида */}
                          <div className="imgblock">
                            <span className="imgtxt">Вид спереди</span>
                            <div className="relative-container front-view-container">
                              {/* Опции с отрицательным position */}
                              {options[trailer._id]?.filter(option => option.position < 0).map(option => (
                                selectedOptions[trailer._id]?.[option.id] && option.image && (
                                  <img
                                    key={`front-negative-${option.id}`}
                                    src={`${option.image}`}
                                    alt={option.name}
                                    className="option-image-front"
                                    style={{
                                      left: option.xPosition || 0,
                                      top: option.yPosition || 0,
                                      zIndex: 0, // Опции под основным изображением
                                    }}
                                  />
                                )
                              ))}

                              {/* Основное изображение трейлера на основе выбранного цвета */}
                              <img
                                src={`${trailer[colorFields.front]}`}
                                alt={trailer.Name}
                                className="trailer-image"
                                style={{ zIndex: 1 }} // Основное изображение
                              />

                              {/* Опции с положительным position */}
                              {options[trailer._id]?.filter(option => option.position >= 0).map(option => (
                                selectedOptions[trailer._id]?.[option.id] && option.image && (
                                  <img
                                    key={`front-positive-${option.id}`}
                                    src={`${option.image}`}
                                    alt={option.name}
                                    className="option-image-front"
                                    style={{
                                      left: option.xPosition || 0,
                                      top: option.yPosition || 0,
                                      zIndex: 2 + option.position, // Опции поверх основного изображения
                                    }}
                                  />
                                )
                              ))}
                            </div>
                          </div>
                          {/* Блок для заднего вида */}
                          <div className="imgblock">
                            <span className="imgtxt">Вид сзади</span>
                            <div className="relative-container back-view-container">
                              {/* Опции с отрицательным position */}
                              {options[trailer._id]?.filter(option => option.position < 0).map(option => (
                                selectedOptions[trailer._id]?.[option.id] && option.Backimage && (
                                  <img
                                    key={`back-negative-${option.id}`}
                                    src={`${option.Backimage}`}
                                    alt={`${option.name} Back`}
                                    className="option-image-back"
                                    style={{
                                      left: option.backXPosition || 0,
                                      top: option.backYPosition || 0,
                                      zIndex: 0, // Опции под основным изображением
                                    }}
                                  />
                                )
                              ))}

                              {/* Основное изображение трейлера на основе выбранного цвета */}
                              <img
                                src={`${trailer[colorFields.back]}`}
                                alt={trailer.Name}
                                className="trailer-image"
                                style={{ zIndex: 1 }} // Основное изображение
                              />

                              {/* Опции с положительным position */}
                              {options[trailer._id]?.filter(option => option.position >= 0).map(option => (
                                selectedOptions[trailer._id]?.[option.id] && option.Backimage && (
                                  <img
                                    key={`back-positive-${option.id}`}
                                    src={`${option.Backimage}`}
                                    alt={`${option.name} Back`}
                                    className="option-image-back"
                                    style={{
                                      left: option.backXPosition || 0,
                                      top: option.backYPosition || 0,
                                      zIndex: 2 + option.position, // Опции поверх основного изображения
                                    }}
                                  />
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-12">
                        <div className="offer-inner">
                         <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>
                            Описание
                          </h5>
                          <pre style={{ color: 'rgb(255, 255, 255)',
                            resize: 'none',  
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word' 
                           }} >{trailer.Description}</pre>
                         <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>
                            Размер
                          </h5>
                          <span style={{ color: 'rgb(255, 255, 255)' }} >{trailer.Size}</span>
                          
                          <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>
                            Цвет
                          </h5>
                          <form style={{ color: '#fff' }}>
                            {/* Селектор цвета */}
                            <div style={{ marginBottom: '15px' }}>
                              
                              <Select
                                value={selectedColors[trailer._id] || 'Белый'}
                                onChange={(value) => handleColorChange(trailer._id, value)}
                                style={{ width: '100%' }}
                              >
                                {colorsList.map(color => (
                                  <Option key={color.label} value={color.label}>{color.label}</Option>
                                ))}
                              </Select>
                            </div>
                            <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>
                              Опции
                            </h5>
                            {/* Список опций */}
                            {options[trailer._id]?.map(option => (
                              <div key={option.id}>
                                <Checkbox
                                  checked={selectedOptions[trailer._id]?.[option.id] || false}
                                  onChange={(e) => handleOptionChange(trailer._id, option.id, option.price, e.target.checked)}
                                >
                                  <strong className="txtoption">{option.name}:</strong> <span className="txt2option">{option.description} {option.price} руб.</span>
                                </Checkbox>
                                <br />
                              </div>
                            ))}
                          </form>
                          <h5 className="font-size-1-24 top" style={{ color: '#ccff00' }}>
                            Цена: <span style={{ color: '#fff' }}>{trailerPrices[trailer._id]} руб.</span>
                          </h5>
                          <button className="overlay-button calculator-button top">Заказать</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrailersWithOptions;
