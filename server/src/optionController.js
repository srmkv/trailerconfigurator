const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { Option, Trailer, TrailerOption } = require('../models');

// Функция для создания директории, если она не существует
const createDir = async (dir) => {
    try {
        if (!(await fs.stat(dir).catch(() => false))) {
            await fs.mkdir(dir, { recursive: true });
            console.log(`Directory created: ${dir}`);
        } else {
            console.log(`Directory already exists: ${dir}`);
        }
    } catch (err) {
        console.error(`Error creating directory ${dir}:`, err);
        throw err;
    }
};

// Настройка хранения файлов с помощью multer
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let { trailerId, trailerName } = req.body;

        // Получаем имя трейлера из базы данных, если его нет в запросе
        if (!trailerName) {
            try {
                const trailer = await Trailer.findByPk(trailerId);
                if (trailer) {
                    trailerName = trailer.Name; // Убедитесь, что поле "Name" существует в модели Trailer
                } else {
                    return cb(new Error('Trailer not found'), null);
                }
            } catch (err) {
                return cb(err, null);
            }
        }

        // Создаем путь к директории
        const dir = path.join(__dirname, '../../client/public/uploads', trailerName, 'options');
        console.log("Directory to create:", dir);

        // Создаем директорию, если она не существует
        try {
            await createDir(dir);
            cb(null, dir);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: (req, file, cb) => {
        console.log(`Saving file: ${file.originalname}`);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

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
                where: { _id: trailerId }
            }]
        });
        res.json({ status: true, data: options });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
});

// Добавление новой опции и связывание её с трейлером
optionRoute.post('/api/options/addOption', upload.single('image'), async (req, res) => {
    try {
        let { name, description, price, trailerId, trailerName } = req.body;

        // Получаем имя трейлера из базы данных, если его нет в запросе
        if (!trailerName) {
            try {
                const trailer = await Trailer.findByPk(trailerId);
                if (trailer) {
                    trailerName = trailer.Name; // Убедитесь, что поле "Name" существует в модели Trailer
                } else {
                    return res.status(404).json({ status: false, message: 'Trailer not found' });
                }
            } catch (err) {
                return res.status(500).json({ status: false, message: err.message });
            }
        }

        // Формируем путь к изображению
        const image = req.file ? `uploads/${trailerName}/options/${req.file.filename}` : null;

        if (!name || !description || !trailerId || !price) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        // Создание опции
        const option = await Option.create({ name, description, price, image });

        // Связывание опции с трейлером
        await TrailerOption.create({
            trailerId,
            optionId: option.id,
            price,
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
