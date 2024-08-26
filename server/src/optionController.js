const express = require('express');
const { Option, Trailer, TrailerOption } = require('../models');

const optionRoute = express.Router();

// Получение всех опций для конкретного прицепа
optionRoute.get('/api/options/getAll', async (req, res) => {
  const { trailerId } = req.query;

  try {
    const options = await Option.findAll({
      include: [{
        model: Trailer,
        through: {
          attributes: []
        },
        where: { _id: trailerId } // Убедитесь, что здесь используется _id
      }]
    });
    res.json({ status: true, data: options });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
});

// Добавление новой опции и связывание её с трейлером
optionRoute.post('/api/options/addOption', async (req, res) => {
  try {
    const { name, description, trailerId } = req.body;

    if (!name || !description || !trailerId) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    // Создание опции
    const option = await Option.create({ name, description });

    // Связывание опции с трейлером
    await TrailerOption.create({
      trailerId,
      optionId: option.id,
    });

    res.json({ status: true, message: 'Option added successfully' });
  } catch (error) {
    console.error('Error adding option:', error);
    res.status(500).json({ status: false, message: 'Something went wrong' });
  }
});

// Привязка опции к трейлеру
optionRoute.post('/api/options/addToTrailer', async (req, res) => {
  const { trailerId, optionId } = req.body;

  if (!trailerId || !optionId) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const trailer = await Trailer.findByPk(trailerId);
    const option = await Option.findByPk(optionId);

    if (!trailer || !option) {
      return res.status(404).send('Trailer or Option not found');
    }

    await TrailerOption.create({ trailerId, optionId });
    res.json({ status: true, message: 'Option added to trailer successfully' });
  } catch (e) {
    console.error('Error adding option to trailer:', e);
    res.status(500).send('Server error');
  }
});

module.exports = optionRoute;
