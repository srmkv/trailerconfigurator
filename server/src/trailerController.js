'use strict';
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const slugify = require('slugify'); // Импортируем slugify
const { Trailer } = require('../models');

// Функция для создания директории, если она не существует
const createDir = (dir) => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Directory created: ${dir}`);
        } else {
            console.log(`Directory already exists: ${dir}`);
        }
    } catch (err) {
        console.error(`Error creating directory ${dir}:`, err);
    }
};

// Определение цветов
const colors = [
    { label: 'Белый', front: 'FrontImg', back: 'BackImg' },
    { label: 'Зеленый', front: 'FrontImgGreen', back: 'BackImgGreen' },
    { label: 'Изумрудный', front: 'FrontImgIzu', back: 'BackImgIzu' },
    { label: 'Красный', front: 'FrontImgRed', back: 'BackImgRed' },
    { label: 'Серый', front: 'FrontImgGray', back: 'BackImgGray' },
    { label: 'Синий', front: 'FrontImgBlue', back: 'BackImgBlue' },
    { label: 'Хакки', front: 'FrontImgHaki', back: 'BackImgHaki' },
    { label: 'Черный', front: 'FrontImgBlack', back: 'BackImgBlack' },
];

// Настройка хранения файлов с помощью multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const name = req.body.Name || 'default';
        let colorFolder = 'default-color';
        colors.forEach(color => {
            if (file.fieldname === color.front || file.fieldname === color.back) {
                colorFolder = color.label;
            }
        });
        let dir = path.join(__dirname, '../../client/public/uploads', name, colorFolder);

        // Создайте директорию, если она не существует
        createDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Переименовываем файл, используя slugify
        const name = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const safeName = slugify(name, { lower: true, strict: true });
        cb(null, `${safeName}${ext}`);
    }
});

const upload = multer({ storage });

const trailerRoute = express.Router();

// Получение всех трейлеров
trailerRoute.get('/api/trailer/getAll', async (req, res) => {
    try {
        const data = await Trailer.findAll();
        res.json({ status: true, data });
    } catch (e) {
        console.error('Error fetching trailers:', e);
        res.status(500).send('Server error');
    }
});

// Добавление или редактирование трейлера
trailerRoute.post('/api/trailer/addEditTrailer', upload.fields(
    colors.flatMap(color => [
        { name: color.front, maxCount: 1 },
        { name: color.back, maxCount: 1 }
    ])
), async (req, res) => {
    console.log('Files:', req.files); // Для отладки
    console.log('Body:', req.body); // Для отладки

    const { actionType, _id, Name, Price, Description } = req.body;

    if (!Name || !Price || !Description) {
        return res.status(400).send('Missing required fields');
    }

    // Обработка изображений для каждого цвета
    const imageFields = {};
    colors.forEach(color => {
        if (req.files[color.front]) {
            imageFields[color.front] = `/uploads/${Name}/${color.label}/${req.files[color.front][0].filename}`;
        }
        // Если файл не загружен, не устанавливаем поле, чтобы сохранить существующее значение

        if (req.files[color.back]) {
            imageFields[color.back] = `/uploads/${Name}/${color.label}/${req.files[color.back][0].filename}`;
        }
        // Если файл не загружен, не устанавливаем поле, чтобы сохранить существующее значение
    });

    try {
        if (actionType === 'edit') {
            // Если есть новые файлы, обновляем соответствующие поля
            // Остальные поля остаются неизменными
            await Trailer.update({
                Name,
                Price,
                Description,
                ...imageFields
            }, { where: { _id } });
            res.send({ status: true, message: 'Trailer updated successfully' });
        } else {
            const trailer = await Trailer.create({
                Name,
                Price,
                Description,
                ...imageFields
            });
            res.send({ status: true, message: 'Trailer added successfully', data: trailer });
        }
    } catch (e) {
        console.error('Error saving trailer:', e);
        res.status(500).send('Server error');
    }
});

// Удаление трейлера
trailerRoute.post('/api/trailer/deleteTrailer', async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).send('Missing ID');
    }

    try {
        const trailer = await Trailer.findByPk(_id);
        if (trailer) {
            // Удаление файлов для каждого цвета
            colors.forEach(color => {
                const dir = path.join(__dirname, '../../client/public/uploads', trailer.Name, color.label);
                if (fs.existsSync(dir)) {
                    fs.rmdirSync(dir, { recursive: true });
                    console.log(`Directory deleted: ${dir}`);
                } else {
                    console.warn(`Directory ${dir} does not exist`);
                }
            });

            // Удаление из базы данных
            await Trailer.destroy({ where: { _id } });
            res.send({ status: true, message: 'Trailer deleted successfully' });
        } else {
            res.status(404).send('Trailer not found');
        }
    } catch (e) {
        console.error('Error deleting trailer:', e);
        res.status(500).send('Server error');
    }
});

module.exports = trailerRoute;
