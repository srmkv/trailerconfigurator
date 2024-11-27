// orderController.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Замените эти значения на ваши фактические данные
const TELEGRAM_TOKEN = '7904579224:AAFBX271Dw-rOJ724TWb-uLDWLUzLdvZkvo';
const CHAT_ID = '125674884';

// Маршрут для обработки заявок
router.post('/api/order', async (req, res) => {
  const { trailerName, trailerColor, options, totalPrice, customerName, customerPhone } = req.body;

  // Формирование сообщения для отправки в Telegram
  const message = `Новая заявка!\nПрицеп: ${trailerName}\nЦвет: ${trailerColor}\nОпции: ${options.join(',\n')}\nЦена: ${totalPrice} руб.\nИмя клиента: ${customerName}\nТелефон клиента: ${customerPhone}`;

  try {
    // Отправка сообщения в Telegram через Telegram Bot API
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });
    res.status(200).json({ success: true, message: 'Заявка успешно отправлена в Telegram!' });
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error);
    res.status(500).json({ success: false, message: 'Не удалось отправить заявку в Telegram' });
  }
});

module.exports = router;
