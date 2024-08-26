const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { Trailer } = require('../models');

// Функция для создания директории, если она не существует
const createDir = (dir) => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Directory created: ${dir}`); // Логирование создания директории
        } else {
            console.log(`Directory already exists: ${dir}`); // Логирование существующей директории
        }
    } catch (err) {
        console.error(`Error creating directory ${dir}:`, err);
    }
};

// Настройка хранения файлов с помощью multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const name = req.body.Name || 'default'; // Используйте значение по умолчанию, если `Name` не определен
        let dir = path.join(__dirname, '../../client/public/uploads', name);

        // Создайте директорию, если она не существует
        createDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
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
trailerRoute.post('/api/trailer/addEditTrailer', upload.fields([
    { name: 'FrontImg', maxCount: 1 },
    { name: 'BackImg', maxCount: 1 }
]), async (req, res) => {
    console.log('Files:', req.files); // Для отладки
    console.log('Body:', req.body); // Для отладки

    const { actionType, _id, Name, Price, Description } = req.body;

    if (!Name || !Price || !Description) {
        return res.status(400).send('Missing required fields');
    }

    // Обработка изображений
    const FrontImg = req.files['FrontImg'] ? `/uploads/${Name}/${req.files['FrontImg'][0].filename}` : null;
    const BackImg = req.files['BackImg'] ? `/uploads/${Name}/${req.files['BackImg'][0].filename}` : null;
    console.log('FrontImg:', FrontImg); // Для отладки

    try {
        if (actionType === 'edit') {
            await Trailer.update({ Name, Price, Description, FrontImg, BackImg }, { where: { _id } });
            res.send({ status: true, message: 'Trailer updated successfully' });
        } else {
            const trailer = await Trailer.create({ Name, Price, Description, FrontImg, BackImg });
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
            // Удаление файлов
            const dir = path.join(__dirname, '../uploads', trailer.Name);
            
            // Проверяем, существует ли директория перед её удалением
            if (fs.existsSync(dir)) {
                fs.rmdirSync(dir, { recursive: true });
                console.log(`Directory deleted: ${dir}`); // Логирование удаления директории
            } else {
                console.warn(`Directory ${dir} does not exist`);
            }

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
