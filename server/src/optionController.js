const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { transliterate } = require('transliteration');
const sanitize = require('sanitize-filename');
const { v4: uuidv4 } = require('uuid');
const { Option, Trailer, TrailerOption } = require('../models');

const optionRoute = express.Router();

// Функция для создания директории, если она не существует
const createDir = async (dir) => {
    try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Directory ensured: ${dir}`);
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

        // Определяем поддиректорию на основе имени поля файла
        let subDir;
        if (file.fieldname.toLowerCase() === 'image') {
            subDir = 'front';
        } else if (file.fieldname.toLowerCase() === 'backimage') {
            subDir = 'back';
        } else {
            // Если используется другое имя поля, можно задать стандартную директорию или вернуть ошибку
            subDir = 'others';
        }

        // Создаем путь к директории
        const dir = path.join(__dirname, '../../client/public/uploads', trailerName, 'options', subDir);
        console.log("Directory to ensure:", dir);

        // Создаем директорию, если она не существует
        try {
            await createDir(dir);
            cb(null, dir);
        } catch (err) {
            cb(err, null);
        }
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        console.log(`Original filename: ${originalName}`);
        // Транслитерируем имя файла
        let transliteratedName = transliterate(originalName);
        console.log(`Transliterated filename: ${transliteratedName}`);
        // Очищаем имя файла
        transliteratedName = sanitize(transliteratedName);
        console.log(`Sanitized filename: ${transliteratedName}`);
        // Добавляем уникальный идентификатор для предотвращения конфликтов имен
        const uniqueName = `${uuidv4()}_${transliteratedName}`;
        console.log(`Final filename to save: ${uniqueName}`);
        cb(null, uniqueName);
    }
});

// Фильтр для разрешённых типов файлов (только изображения)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Ограничение размера файла до 5MB
const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Получение всех опций для конкретного трейлера
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
            }],
             order: [['poryadok', 'ASC']]
        });
        res.json({ status: true, data: options });
    } catch (error) {
        console.error('Error fetching options:', error);
        res.status(500).json({ status: false, message: error.message });
    }
});

// Добавление новой опции и связывание её с трейлером
optionRoute.post('/api/options/addOption', upload.fields([{ name: 'image' }, { name: 'Backimage' }]), async (req, res) => {
    try {
        let { name,poryadok, description, price, trailerId, trailerName } = req.body;

        // Получаем имя трейлера из базы данных, если его нет в запросе
        if (!trailerName) {
            try {
                const trailer = await Trailer.findByPk(trailerId);
                if (trailer) {
                    trailerName = trailer.Name;
                } else {
                    return res.status(404).json({ status: false, message: 'Trailer not found' });
                }
            } catch (err) {
                return res.status(500).json({ status: false, message: err.message });
            }
        }

        // Формируем пути к изображениям
        const frontImage = req.files['image'] ? `uploads/${trailerName}/options/front/${req.files['image'][0].filename}` : null;
        const backImage = req.files['Backimage'] ? `uploads/${trailerName}/options/back/${req.files['Backimage'][0].filename}` : null;
        const originalFrontName = req.files['image'] ? req.files['image'][0].originalname : null;
        const originalBackName = req.files['Backimage'] ? req.files['Backimage'][0].originalname : null;

        if (!name || !trailerId || !price) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        // Создание опции
        const option = await Option.create({ 
            name,
            poryadok,
            description, 
            price, 
            image: frontImage, 
            Backimage: backImage,
            originalName: originalFrontName || originalBackName // Сохранение оригинального имени (опционально)
        });

        // Связывание опции с трейлером
        await TrailerOption.create({
            trailerId,
            optionId: option.id,
            price,
        });

        res.json({ status: true, message: 'Option added successfully', data: option });
    } catch (error) {
        console.error('Error adding option:', error);
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
});


// Редактирование опции
optionRoute.put('/api/options/edit/:id', upload.fields([{ name: 'image' }, { name: 'Backimage' }]), async (req, res) => {
    const { id } = req.params;
    const { name, poryadok, description, price, trailerId, position, positionBack } = req.body;

    try {
        const option = await Option.findByPk(id);
        if (!option) {
            return res.status(404).json({ status: false, message: 'Option not found' });
        }

        // Получаем имя трейлера, если trailerId изменился
        let trailerName = 'unknown';
        if (trailerId) {
            const trailer = await Trailer.findByPk(trailerId);
            if (trailer) {
                trailerName = trailer.Name;
            } else {
                return res.status(404).json({ status: false, message: 'Trailer not found' });
            }
        } else {
            // Извлекаем из существующего пути
            if (option.image) {
                const parts = option.image.split('/');
                if (parts.length > 1) { // Проверка на наличие trailerName в пути
                    trailerName = parts[1]; // Предполагается, что путь имеет вид 'uploads/{trailerName}/options/front/{filename}'
                }
            }
        }

        // Обновление пути к изображению, если загружено новое
        let image = option.image;
        let Backimage = option.Backimage;

        if (req.files['image']) {
            // Удаление старого изображения, если оно существует
            if (image) {
                const oldImagePath = path.join(__dirname, '../../client/public', image);
                await fs.unlink(oldImagePath).catch(err => {
                    console.error(`Error deleting old image file: ${oldImagePath}`, err);
                });
            }
            image = `uploads/${trailerName}/options/front/${req.files['image'][0].filename}`;
        }

        if (req.files['Backimage']) {
            // Удаление старого обратного изображения, если оно существует
            if (Backimage) {
                const oldBackImagePath = path.join(__dirname, '../../client/public', Backimage);
                await fs.unlink(oldBackImagePath).catch(err => {
                    console.error(`Error deleting old back image file: ${oldBackImagePath}`, err);
                });
            }
            Backimage = `uploads/${trailerName}/options/back/${req.files['Backimage'][0].filename}`;
        }

        // Обновляем опцию
        await option.update({
            name: name || option.name,
            poryadok: poryadok || option.poryadok,
            description: description || option.description,
            price: price || option.price,
            image: image, // Если новое изображение не загружено, остается старое
            Backimage: Backimage, // Если новое обратное изображение не загружено, остается старое
            position: position !== undefined ? parseInt(position, 10) : option.position, // Обработка поля position
            positionBack: positionBack !== undefined ? parseInt(positionBack, 10) : option.positionBack, // Обработка поля positionBack
        });

        res.json({ status: true, message: 'Option updated successfully', data: option });
    } catch (error) {
        console.error('Error editing option:', error);
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
});


// Удаление опции
optionRoute.delete('/api/options/delete/:id', async (req, res) => {
    const { id } = req.params;
    const { trailerId } = req.query;  // Дополнительный параметр, если нужен

    console.log(`Received DELETE /api/options/delete/${id} with trailerId=${trailerId}`);

    try {
        const option = await Option.findByPk(id);
        if (!option) {
            return res.status(404).json({ status: false, message: 'Option not found' });
        }

        // Удаление изображений, если существуют
        if (option.image) {
            const imagePath = path.join(__dirname, '../../client/public', option.image);
            await fs.unlink(imagePath).catch(err => {
                console.error(`Error deleting image file: ${imagePath}`, err);
            });
        }

        if (option.Backimage) {
            const backImagePath = path.join(__dirname, '../../client/public', option.Backimage);
            await fs.unlink(backImagePath).catch(err => {
                console.error(`Error deleting back image file: ${backImagePath}`, err);
            });
        }

        // Удаление опции и связей с трейлером
        await TrailerOption.destroy({ where: { optionId: id } });
        await option.destroy();

        console.log(`Option deleted:`, id);

        res.json({ status: true, message: 'Option deleted successfully' });
    } catch (error) {
        console.error('Error deleting option:', error);
        res.status(500).json({ status: false, message: 'Something went wrong' });
    }
});

module.exports = optionRoute;
