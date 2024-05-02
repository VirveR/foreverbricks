const partsModel = require('../models/Part');
const setsModel = require('../models/Set');
const collsModel = require('../models/Collection');

/*** ROUTES ***/
// GET / (get home page)
// POST /login (login)
// GET /test (get test page)
// POST /test/part (add a part to db)
// POST /test/set (add a set to db)
// POST /test/partdet (add details to part in db)
// POST /test/addcontent (add parts to set in db)
// GET /blog (get blog page)
// GET /about (get about page)

// GET / (get home page)
const getHome = (req, res) => {
    try {
        res.status(200).render('index', {
            title: 'Home'
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe etusivulla.')
    }
};

// POST /login (login)
const login = async (req, res) => {
    try {
        const name = req.body.name;
        const pass = req.body.password;
        const coll = await collsModel.login(name, pass);
        if (coll) {
            req.session.coll = coll;
            res.status(200).redirect('/');
        }
        else {
            console.log('Virhe sisäänkirjautumisessa (model)');
            res.status(404).redirect('/');
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe sisäänkirjautumisessa (controller)');
        res.status(500).redirect('/');
    }
}

// GET /test (get test page)
const getTest = (req, res) => {
    try {
        res.status(200).render('test', {
            title: 'Test'
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe testisivulla');
    }
}

// POST /test/part (add a part to db)
const addPart = async (req, res) => {
    try {
        const part = {
            number: req.body.number,
            type: req.body.type,
            size: req.body.size
        }
        if (await partsModel.addPart(part)) {
            res.status(200).render('test', {
                title: 'Test',
                info: 'Osa lisätty.'
            });
        }
        else {
            console.log('Virhe osan lisäämisessä (model)');
            res.redirect('/test');
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe osan lisäämisessä (controller)');
        res.redirect('/test');
    }
}

// POST /test/set (add a set to db)
const addSet = async (req, res) => {
    try {
        const set = {
            number: req.body.number,
            name: req.body.name,
            year: req.body.year,
            own: req.body.own
        }
        if (await setsModel.addSet(set)) {
            res.status(200).render('test', {
                title: 'Test',
                info: 'Setti lisätty.'
            });
        }
        else {
            console.log('Virhe setin lisäämisessä (model)');
            res.redirect('/test');
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe setin lisäämisessä (controller)');
        res.redirect('/test');
    }
}

// POST /test/partdet (add details to part in db)
const addVersion = async (req, res) => {
    try {
        const number = req.body.number;
        const version = {
            start: req.body.start,
            end: req.body.end,
            features: {
                pip: req.body.pip,
                minfo: req.body.minfo,
                logo: req.body.logo,
                moldno: req.body.moldno,
                from: req.body.from,
                to: req.body.to,
                flowrib: req.body.flowrib,
                small: req.body.small,
                wedge: req.body.wedge,
                cross: req.body.cross
            }
        }
        if (partsModel.addVersion(number, version)) {
            res.status(200).render('test', {
                title: 'Test',
                info: 'Versio lisätty.'
            });
        }
        else {
            console.log('Virhe version lisäämisessä (model)');
            res.redirect('/test');
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe version lisäämisessä (controller');
        res.redirect('/test');
    }
}

// POST /test/addcontent (add parts to set in db)
const addContent = (req, res) => {
    try {
        const number = req.body.number;
        const content = {
            part: req.body.part,
            color: req.body.color,
            quant: req.body.quant
        }
        if (setsModel.addContent(number, content)) {
            res.status(200).render('test', {
                title: 'Test',
                info: 'Rivi lisätty'
            });
        }
        else {
            console.log(error);
            console.log('Virhe sisältörivin lisäämisessä (model)');
            res.redirect('/test');
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe sisältörivin lisäämisessä (controller)');
        res.redirect('/test');
    }
}

// GET /blog (get blog page)
const getBlog = (rec, res) => {
    try {
        res.status(200).render('blog', {
            title: 'Blog'
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe blogisivulla');
    }
}

// GET /about (get about page)
const getAbout = (rec, res) => {
    try {
        res.status(200).render('about', {
            title: 'About'
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe about-sivulla');
    }
}

module.exports = {
    getHome, login, getTest, 
    addPart, addSet, addVersion, addContent,
    getBlog, getAbout
};