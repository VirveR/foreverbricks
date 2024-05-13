const partsModel = require('../models/Part');

/* ROUTES */
// GET /api/parts (get parts page)
// GET /parts/:number (get part by number)

// GET api/parts (get parts page)
const getParts = async (req, res) => {
    try {
        const parts = await partsModel.allParts();
        res.status(200).send(parts);
    }
    catch (error) {
        console.log(error);
        console.log('Virhe osien haussa.')
    }
}

const getPartNumber = async (req, res) => {
    try {
        const part = await partsModel.partNumber(req.params.number);
        if (part) {
            res.status(200).send(part);
        }
        else {
            res.status(404).send(error);
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe osan haussa (nro)');
    }
}

module.exports = {
    getParts, getPartNumber
}