const partsModel = require('../models/Part');
const setsModel = require('../models/Set');
const collsModel = require('../models/Collection');

/*** ROUTES ***/
// GET / (get home page)
// POST /login (log in)
// POST /logout (log out)
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
        let coll = {};
        if (req.session.coll) { coll = req.session.coll; }
        res.status(200).render('index', {
            title: 'Home',
            coll: coll
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe etusivulla.')
    }
};

// POST /login (log in)
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
            res.status(401).redirect('/');
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe sisäänkirjautumisessa (controller)');
        res.status(500).redirect('/');
    }
}

// POST /logout (log out)
const logout = (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/');
}

// GET /test (get test page)
const getTest = (req, res) => {
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
    try {
        res.status(200).render('test', {
            title: 'Test',
            coll: coll
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe testisivulla');
    }
}

// POST /test/part (add a part to db)
const addPart = async (req, res) => {
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
    try {
        const part = {
            number: req.body.number,
            type: req.body.type,
            size: req.body.size
        }
        if (await partsModel.addPart(part)) {
            res.status(200).render('test', {
                title: 'Test',
                info: 'Osa lisätty.',
                coll: coll
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
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
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
                info: 'Setti lisätty.',
                coll: coll
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
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
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
                info: 'Versio lisätty.',
                coll: coll
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
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
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
                info: 'Rivi lisätty',
                coll: coll
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
const getBlog = (req, res) => {
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
    try {
        res.status(200).render('blog', {
            title: 'Blog',
            coll: coll
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe blogisivulla');
    }
}

module.exports = {
    getHome, login, logout, getTest, 
    addPart, addSet, addVersion, addContent,
    getBlog
};