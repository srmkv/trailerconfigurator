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
optionRoute.post('/api/options/addOption',  upload.fields([{ name: 'image' }, { name: 'Backimage' }]), async (req, res) => {
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
        const image = req.files['image'] ? `uploads/${trailerName}/options/${req.files['image'][0].filename}` : null;
        const Backimage = req.files['Backimage'] ? `uploads/${trailerName}/options/${req.files['Backimage'][0].filename}` : null;

        if (!name || !description || !trailerId || !price) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        // Создание опции
        const option = await Option.create({ name, description, price, image, Backimage });

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

// Редактирование опции
optionRoute.put('/api/options/edit/:id',  upload.fields([{ name: 'image' }, { name: 'Backimage' }]), async (req, res) => {
    const { id } = req.params;
    const { name, description, price, trailerId, position } = req.body;

    try {
        const option = await Option.findByPk(id);
        if (!option) {
            return res.status(404).json({ status: false, message: 'Option not found' });
        }

        // Обновление пути к изображению, если загружено новое
        let image = option.image;
        let Backimage = option.Backimage; // Объявляем переменную Backimage

        if (req.files['image']) {
            // Удаление старого изображения, если оно существует
            if (image) {
                const oldImagePath = path.join(__dirname, '../../client/public', image);
                await fs.unlink(oldImagePath).catch(err => {
                    console.error(`Error deleting old image file: ${oldImagePath}`, err);
                });
            }
            const trailer = trailerId ? await Trailer.findByPk(trailerId) : null;
            const trailerName = trailer ? trailer.Name : 'unknown';
            image = `uploads/${trailerName}/options/${req.files['image'][0].filename}`;
        }

        if (req.files['Backimage']) {
            // Удаление старого обратного изображения, если оно существует
            if (Backimage) {
                const oldBackImagePath = path.join(__dirname, '../../client/public', Backimage);
                await fs.unlink(oldBackImagePath).catch(err => {
                    console.error(`Error deleting old back image file: ${oldBackImagePath}`, err);
                });
            }
            const trailer = trailerId ? await Trailer.findByPk(trailerId) : null;
            const trailerName = trailer ? trailer.Name : 'unknown';
            Backimage = `uploads/${trailerName}/options/${req.files['Backimage'][0].filename}`;
        }

        // Обновляем опцию
        await option.update({ 
            name: name || option.name, 
            description: description || option.description, 
            price: price || option.price, 
            image: image || option.image,
            Backimage: Backimage || option.Backimage,
            position: position !== undefined ? parseInt(position, 10) : option.position // Обработка поля position
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
