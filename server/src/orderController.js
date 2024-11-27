// orderController.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Замените эти значения на ваши фактические данные
const TELEGRAM_TOKEN = '7904579224:AAFBX271Dw-rOJ724TWb-uLDWLUzLdvZkvo';
const CHAT_ID = '125674884';

/**
 * Маршрут для обработки заказов
 * Endpoint: POST /api/order
 * Body параметры:
 * - trailerName: название прицепа
 * - trailerColor: цвет прицепа
 * - options: массив выбранных опций
 * - totalPrice: общая цена
 * - customerName: имя клиента
 * - customerPhone: телефон клиента
 */
router.post('/api/order', async (req, res) => {
  const { trailerName, trailerColor, options, totalPrice, customerName, customerPhone } = req.body;

  // Проверка обязательных полей
  if (!trailerName || !customerName || !customerPhone) {
    return res.status(400).json({ success: false, message: 'Пожалуйста, заполните все обязательные поля.' });
  }

  // Формирование сообщения для отправки в Telegram
  const optionsList = options && Array.isArray(options) ? options.join(',\n') : 'Без опций';
  const message = `*Новая заявка!*\n*Прицеп:* ${trailerName}\n*Цвет:* ${trailerColor}\n*Опции:* ${optionsList}\n*Цена:* ${totalPrice} руб.\n*Имя клиента:* ${customerName}\n*Телефон клиента:* ${customerPhone}`;

  try {
    // Отправка сообщения в Telegram через Telegram Bot API
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown' // Используем Markdown для форматирования
    });

    res.status(200).json({ success: true, message: 'Заявка успешно отправлена в Telegram!' });
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Не удалось отправить заявку в Telegram.' });
  }
});

/**
 * Маршрут для обработки запросов на получение цены
 * Endpoint: POST /api/request-price
 * Body параметры:
 * - product: название продукта
 * - name: имя клиента
 * - phone: телефон клиента
 * - date: дата запроса (необязательно, можно генерировать на сервере)
 */
router.post('/api/request-price', async (req, res) => {
  const { product, name, phone, date } = req.body;

  // Проверка обязательных полей
  if (!product || !name || !phone) {
    return res.status(400).json({ success: false, message: 'Пожалуйста, заполните все обязательные поля.' });
  }

  // Формирование сообщения для отправки в Telegram
  const requestDate = date ? new Date(date).toLocaleString() : new Date().toLocaleString();
  const message = `*Запрос цены!*\n*Продукт:* ${product}\n*Имя клиента:* ${name}\n*Телефон клиента:* ${phone}\n*Дата запроса:* ${requestDate}`;

  try {
    // Отправка сообщения в Telegram через Telegram Bot API
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown' // Используем Markdown для форматирования
    });

    res.status(200).json({ success: true, message: 'Запрос цены успешно отправлен в Telegram!' });
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Не удалось отправить запрос цены в Telegram.' });
  }
});

module.exports = router;
