//#region Module import
const trailerRoute = require('express').Router();
const { Trailer } = require('../models')
//#endregion


//#region Get Methods
trailerRoute.get('/api/trailer/getAll', async (req, res) => {
    try {
        let data = await Trailer.findAll();
        return (data && data.length > 0 ? res.send({ status: true, data }) : res.send({ status: false, message: 'No data found' }))
    }
    catch (e) {
        console.log(e)
        res.send({ status: false, message: 'Something went wrong.' })
    }
});


trailerRoute.get('/api/trailer/getTrailerById/:_id', async (req, res) => {
    try {
        let { _id } = req.params;
        let data = await Trailer.findOne({
            where: { _id },
        });
        return (data ? res.send({ status: true, data }) : res.send({ status: false, message: 'No data found' }))
    }
    catch (e) {
        console.log(e);
        res.send({ status: false, message: 'Something went wrong.' })
    }
})
//#endregion


//#region Post Methods
trailerRoute.post('/api/trailer/addEditTrailer', async (req, res) => {
    try {
        let { actionType, _id, Name, Price, Description, FrontImg ,BackImg } = req.body;

        if (actionType === 'edit') {

            let data = await Trailer.update({  Name, Price, Description, FrontImg ,BackImg },{ where: { _id } });
            res.send({ status: true, message: 'Trailer  updated successfully' })
        }
        else {
            let data = await Trailer.create({  Name, Price, Description, FrontImg ,BackImg })
            res.send({ status: true, message: 'Trailer  inserted successfully' })
        }
    }
    catch (e) {
        console.log(e)
        res.send({ status: false, message: 'Something went wrong.' })
    }
})

trailerRoute.post('/api/trailer/deleteTrailer', async (req, res) => {
    try {
        let { _id } = req.body

        if (_id) {
            const data = await Trailer.findOne({ where: { _id } })
            if (data) {
                await data.destroy()
                res.send({ status: true, message: 'Trailer  deleted successfully' })
            }
            else {
                res.send({ status: false, message: "Trailer  doesn't exists." })
            }
        }
        else {
            res.send({ status: false, message: "Trailer  id is required." })
        }
    }
    catch (e) {
        console.log(e)
        res.send({ status: false, message: 'Something went wrong.' })
    }
})
//#endregion

module.exports = trailerRoute;