// IndividualModal.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import { Modal, Button, Input, message as AntMessage } from 'antd';
import axios from 'axios'; // Убедитесь, что axios установлен
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './IndividualModal.css'; // Создайте этот файл для стилизации модального окна

const IndividualModal = ({ visible, onClose }) => {
  const [isRequestPriceModalOpen, setIsRequestPriceModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const c25Product = {
    title: "Индивидуальное исполнение",
    images: [
      "/uploads/live/C25/IMGP6338.webp",
      "/uploads/live/C25/IMGP8556.webp",
      "/uploads/live/C25/IMGP8585.webp",
    ],
    icon: [
      "/assets/images/icon_trailer/1.png",
      "/assets/images/icon_trailer/3.png",
      "/assets/images/icon_trailer/4.png",
      "/assets/images/icon_trailer/5.png",
      "/assets/images/icon_trailer/6.png",
      "/assets/images/icon_trailer/7.png",
      "/assets/images/icon_trailer/8.png",
      "/assets/images/icon_trailer/9.png",
      "/assets/images/icon_trailer/10.png",
    ],
    sub: "Назначение:",
    price: "по запросу",
    size: "Базовое исполнение:<br>  Внутренний размер кузова 2,5 х 1,3 м.",
    description: `Возможно изготовление прицепов в индивидуальной или подарочной юбилейной комплектации, с разработкой оригинальных опций.<br>
Осуществляем разработку и изготовление специальных прицепов,  максимально адаптированных под конкретные задачи различных государственных и коммерческих предприятий.`,
    url: "/gallery?type=Individual",
  };

  // Функция для открытия модального окна запроса цены
  const openRequestPriceModal = () => {
    setIsRequestPriceModalOpen(true);
  };

  // Функция для закрытия модального окна запроса цены
  const closeRequestPriceModal = () => {
    setIsRequestPriceModalOpen(false);
    setCustomerInfo({ name: '', phone: '' });
  };

  // Обработчик изменения полей ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик отправки формы запроса цены
  const handleRequestPriceSubmit = async () => {
    const { name, phone } = customerInfo;

    // Простая валидация
    if (!name.trim()) {
      AntMessage.error('Пожалуйста, введите ваше имя.');
      return;
    }
    if (!phone.trim()) {
      AntMessage.error('Пожалуйста, введите ваш номер телефона.');
      return;
    }

    setIsSubmitting(true);

    // Подготовка данных для отправки
    const requestData = {
      product: c25Product.title,
      name,
      phone,
      date: new Date().toISOString(),
    };

    try {
      // Отправка данных на сервер
      // Замените URL на ваш реальный эндпоинт
      await axios.post('http://95.79.52.15:5000/api/request-price', requestData);

      AntMessage.success('Ваш запрос успешно отправлен!');
      closeRequestPriceModal();
    } catch (error) {
      console.error('Ошибка при отправке запроса цены:', error);
      AntMessage.error('Произошла ошибка при отправке запроса. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        title={c25Product.title}
        visible={visible}
        onCancel={onClose}
        footer={[
         
          <a href={c25Product.url} target="_blank" rel="noopener noreferrer" key="gallery">
            <Button type="primary">Перейти в галерею</Button>
          </a>,
          <Button key="requestPrice" type="primary" className="green-button" onClick={openRequestPriceModal}>
            Запросить цену
          </Button>,
        ]}
        width={800}
      >
        <Slider {...imageSliderSettings} className="popup-image-slider">
          {c25Product.images.map((image, idx) => (
            <div key={`${c25Product.title}-${idx}`} className="slider-image-wrapper">
              <img src={image} alt={`${c25Product.title} Image ${idx + 1}`} className="popup-image" />
            </div>
          ))}
        </Slider>

        <p className="popup-description" dangerouslySetInnerHTML={{ __html: c25Product.sub }}></p>
        <div className="icon-row-popup">
          {c25Product.icon.map((icon, idx) => (
            <img
              key={`${c25Product.title}-icon-${idx}`}
              src={icon}
              alt={`${c25Product.title} Icon ${idx + 1}`}
              className="icon-image-popup"
            />
          ))}
        </div>

        <p className="popup-description" dangerouslySetInnerHTML={{ __html: c25Product.size }}></p>
        <p className="popup-description">Цена: {c25Product.price}</p>
        <div className="popup-description" dangerouslySetInnerHTML={{ __html: c25Product.description }}></div>
      </Modal>

      {/* Модальное окно для запроса цены */}
      <Modal
        title="Запросить цену"
        visible={isRequestPriceModalOpen}
        onCancel={closeRequestPriceModal}
        onOk={handleRequestPriceSubmit}
        okText="Отправить запрос"
        cancelText="Отмена"
        confirmLoading={isSubmitting}
      >
        <Input
          name="name"
          placeholder="Ваше имя"
          value={customerInfo.name}
          onChange={handleInputChange}
          style={{ marginBottom: '10px' }}
        />
        <Input
          name="phone"
          placeholder="Ваш номер телефона"
          value={customerInfo.phone}
          onChange={handleInputChange}
        />
      </Modal>
    </>
  );
};

export default IndividualModal;
