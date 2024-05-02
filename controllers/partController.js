const partsModel = require('../models/Part');

/* ROUTES */
// GET /parts (get parts page)
// GET /parts/:number (get part by number)

// GET /parts (get parts page)
const getParts = async (req, res) => {
    try {
        const parts = await partsModel.allParts();
        res.status(200).render('parts', {
            title: 'Parts',
            parts: parts.map(part => part.toJSON())
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe osien haussa.')
    }
};

const getPartNumber = async (req, res) => {
    try {
        const part = await partsModel.partNumber(req.params.number);
        if (part) {
            res.status(200).render('parts', {
                title: req.params.number,
                part: part.toJSON()
            });
        }
        else {
            res.status(404).render('parts', {
                title: 'Parts',
                info: `Couldn't find the part`
            });
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe osan haussa (nro)');
        res.render('Parts', {
            title: 'Parts',
            info: 'Something went wrong'
        });
    }
}

module.exports = {
    getParts, getPartNumber
}