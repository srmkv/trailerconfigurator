// TrailersWithOptions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, message as AntMessage, Select, Modal, Input } from 'antd';
import './TrailersWithOptions.css';

const { Option } = Select;
const baseURL = "http://95.79.52.15:5000/";

const colorsList = [
  { label: 'Белый', front: 'FrontImg', back: 'BackImg' },
  { label: 'Зеленый', front: 'FrontImgGreen', back: 'BackImgGreen' },
  { label: 'Изумрудный', front: 'FrontImgIzu', back: 'BackImgIzu' },
  { label: 'Красный', front: 'FrontImgRed', back: 'BackImgRed' },
  { label: 'Серый', front: 'FrontImgGray', back: 'BackImgGray' },
  { label: 'Синий', front: 'FrontImgBlue', back: 'BackImgBlue' },
  { label: 'Хаки', front: 'FrontImgHaki', back: 'BackImgHaki' },
  { label: 'Черный', front: 'FrontImgBlack', back: 'BackImgBlack' },
];

const getColorFields = (colorLabel) => {
  const color = colorsList.find(c => c.label === colorLabel);
  return color ? { front: color.front, back: color.back } : { front: 'FrontImg', back: 'BackImg' };
};

const TrailersWithOptions = () => {
  const [trailers, setTrailers] = useState([]);
  const [options, setOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [trailerPrices, setTrailerPrices] = useState({});
  const [selectedTrailerId, setSelectedTrailerId] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [currentTrailer, setCurrentTrailer] = useState(null);

  const fetchTrailers = async () => {
    try {
      const response = await axios.get(`${baseURL}api/trailer/getAll`);
      const { status, data } = response.data;
      if (status) {
        setTrailers(data);
        const trailersWithPrices = {};
        const initialColors = {};

        data.forEach(trailer => {
          trailersWithPrices[trailer._id] = parseFloat(trailer.Price) || 0;
          initialColors[trailer._id] = 'Белый';
          fetchOptionsForTrailer(trailer._id);
        });

        setTrailerPrices(trailersWithPrices);
        setSelectedColors(initialColors);

        if (data.length > 0) {
          setSelectedTrailerId(data[0]._id);
        }
      } else {
        setTrailers([]);
      }
    } catch (error) {
      console.error('Error fetching trailers:', error);
      AntMessage.error('Ошибка при получении прицепов.');
    }
  };

  const fetchOptionsForTrailer = async (trailerId) => {
    try {
      const response = await axios.get(`${baseURL}api/options/getAll`, {
        params: { trailerId }
      });
      const { status, data } = response.data;
      if (status) {
        const processedOptions = data.map(option => ({
          ...option,
          position: Number(option.position),
          positionBack: Number(option.positionBack),
          xPosition: Number(option.xPosition) || 0,
          yPosition: Number(option.yPosition) || 0,
          backXPosition: Number(option.backXPosition) || 0,
          backYPosition: Number(option.backYPosition) || 0
        }));

        setOptions(prev => ({
          ...prev,
          [trailerId]: processedOptions
        }));
      } else {
        setOptions(prev => ({ ...prev, [trailerId]: [] }));
      }
    } catch (error) {
      console.error('Error fetching options for trailer:', error);
      AntMessage.error('Ошибка при получении опций.');
    }
  };

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

  const handleOrderClick = (trailer) => {
    setCurrentTrailer(trailer);
    setIsModalOpen(true);
  };

  const handleOrderSubmit = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      AntMessage.error('Введите ваше имя и номер телефона.');
      return;
    }

    const selectedOptionsList = options[currentTrailer._id]?.filter(option =>
      selectedOptions[currentTrailer._id]?.[option.id]
    ).map(option => option.name);

    const orderData = {
      trailerName: currentTrailer.Name,
      trailerColor: selectedColors[currentTrailer._id] || 'Белый',
      options: selectedOptionsList,
      totalPrice: trailerPrices[currentTrailer._id],
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone
    };

    try {
      await axios.post(`${baseURL}api/order`, orderData);
      AntMessage.success("Заявка успешно отправлена!");
      setIsModalOpen(false);
      setCustomerInfo({ name: '', phone: '' });
    } catch (error) {
      console.error('Error sending order:', error);
      AntMessage.error("Ошибка при отправке заявки.");
    }
  };

  const handleColorChange = (trailerId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [trailerId]: color
    }));

    const trailer = trailers.find(t => t._id === trailerId);
    if (trailer) {
      setTrailerPrices(prev => ({
        ...prev,
        [trailerId]: parseFloat(trailer.Price) || 0
      }));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCustomerInfo({ name: '', phone: '' });
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

  // Получение выбранного прицепа
  const currentSelectedTrailer = trailers.find(trailer => trailer._id === selectedTrailerId);

  return (
    <section id="calculator" className="offer-area-home-1">
      <Modal
        title="Введите ваше имя и номер телефона"
        open={isModalOpen}
        onOk={handleOrderSubmit}
        onCancel={handleCancel}
        okText="Отправить заявку"
        cancelText="Отмена"
      >
        <Input
          placeholder="Ваше имя"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Ваш номер телефона"
          value={customerInfo.phone}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
        />
      </Modal>

      <div className="container-calk">
        <div className="title">
          <div className="sub-title">
            <p>Конфигуратор</p>
          </div>
          <div className="main-title">
            <h3 className="split-collab">
              Собери свой прицеп
             
            </h3>
          </div>
        </div>
        <div className="offer-wrapper">
          <div className="d-flex align-items-start">
           

            {/* Контент выбранного прицепа */}
            {currentSelectedTrailer && (
              <div className="col-12">
                <div className="row justify-content-between">
                  <div className="col-xl-8 col-lg-6 col-md-12">
                    <div className="image-container">

                      <div className="imgblock">
                        <span className="imgtxt">Вид спереди</span>
                        <div className="relative-container front-view-container">
                          <img
                            src={`${currentSelectedTrailer[getColorFields(selectedColors[currentSelectedTrailer._id]).front]}`}
                            alt={`${currentSelectedTrailer.Name} Front`}
                            className="trailer-image"
                            style={{ zIndex: 0, position: 'relative' }}
                          />
                          {options[currentSelectedTrailer._id]?.map(option => (
                            selectedOptions[currentSelectedTrailer._id]?.[option.id] && option.image ? (
                              <img
                                key={`front-${option.id}`}
                                src={option.image}
                                alt={`${option.name} Front`}
                                className="option-image-front"
                                style={{
                                  position: 'absolute',
                                  left: option.xPosition || 0,
                                  top: option.yPosition || 0,
                                  zIndex: option.position,
                                }}
                              />
                            ) : null
                          ))}
                        </div>
                      </div>


                      <div className="imgblock">
                        <span className="imgtxt">Вид сзади</span>
                        <div className="relative-container back-view-container">
                          <img
                            src={`${currentSelectedTrailer[getColorFields(selectedColors[currentSelectedTrailer._id]).back]}`}
                            alt={`${currentSelectedTrailer.Name} Back`}
                            className="trailer-image"
                            style={{ zIndex: 0, position: 'relative' }}
                          />
                          {options[currentSelectedTrailer._id]?.map(option => (
                            selectedOptions[currentSelectedTrailer._id]?.[option.id] && option.Backimage ? (
                              <img
                                key={`back-${option.id}`}
                                src={option.Backimage}
                                alt={`${option.name} Back`}
                                className="option-image-back"
                                style={{
                                  position: 'absolute',
                                  left: option.backXPosition || 0,
                                  top: option.backYPosition || 0,
                                  zIndex: option.positionBack,
                                }}
                              />
                            ) : null
                          ))}

                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12">
                    <div className="">
                     <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>Базовое исполнение</h5>
                     {/* Выпадающий список для выбора прицепа */}
            <div className="w-100 mb-4">
              <Select
                value={selectedTrailerId}
                onChange={(value) => setSelectedTrailerId(value)}
                style={{ width: '100%' }}
                placeholder="Выберите прицеп"
              >
                {trailers.map(trailer => (
                  <Option key={trailer._id} value={trailer._id}>
                    {trailer.Name}
                  </Option>
                ))}
              </Select>
            </div>
                      <div className="rem1">
                      <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>Размер кузова</h5>
                      <span style={{ color: 'rgb(255, 255, 255)' }}>{currentSelectedTrailer.Size}</span>
                      </div>
                      <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>Цвет</h5>
                      <div className="basic-execution">
                        {/* Добавляем выпадающий список для выбора цвета */}
                        <div style={{ marginBottom: '15px' }}>
                          <Select
                            value={selectedColors[currentSelectedTrailer._id] || 'Белый'}
                            onChange={(value) => handleColorChange(currentSelectedTrailer._id, value)}
                            style={{ width: '100%' }}
                            placeholder="Выберите цвет"
                          >
                            {colorsList.map(color => (
                              <Option key={color.label} value={color.label}>{color.label}</Option>
                            ))}
                          </Select>
                        </div>
                        {/* Отображаем описание без изображений */}
                        <pre style={{ color: 'rgb(255, 255, 255)', resize: 'none', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                          {currentSelectedTrailer.Description}
                        </pre>
                      </div>
                      
                      <h5 className="font-size-1-24" style={{ color: '#ccff00' }}>Опции</h5>
                      <form style={{ color: '#fff' }}>
                        {options[currentSelectedTrailer._id]?.map(option => (
                          <div key={option.id}>
                            <Checkbox
                              checked={selectedOptions[currentSelectedTrailer._id]?.[option.id] || false}
                              onChange={(e) => handleOptionChange(currentSelectedTrailer._id, option.id, option.price, e.target.checked)}
                            >
                              <span className="txtoption">{option.name}:</span> <span className="txt2option">{option.description} {option.price} руб.</span>
                            </Checkbox>
                            <br />
                          </div>
                        ))}
                      </form>
                      <h5 className="font-size-1-24 top" style={{ color: '#ccff00' }}>Цена: <span style={{ color: '#fff' }}>{trailerPrices[currentSelectedTrailer._id]} руб.</span></h5>
                      <button onClick={() => handleOrderClick(currentSelectedTrailer)} className="overlay-button calculator-button top">Заказать</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrailersWithOptions;
