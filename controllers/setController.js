const setsModel = require('../models/Set');
const collsModel = require('../models/Collection');

/* ROUTES */
// GET /sets (get sets page)
// GET /sets/:number (get set by number)
// POST /sets/addsettocoll (add set to collection in db)
// POST /sets/removesetfromcoll (remove set from collection in db)

// GET /sets (get sets page)
const getSets = async (req, res) => {
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
    try {
        const s = await setsModel.allSets();
        let sets = {};
        if (req.session.coll) {
            owner = req.session.coll.owner;
            const coll = await collsModel.myCollection(owner);
            sets = s.map(set => {
                if (coll.sets.find(cset => cset === set.number)) {
                    return {...set.toJSON(), own: true};
                }
                else {
                    return {...set.toJSON(), own: false};
                }
            });
        }
        else {
            sets = s.map(set => {
                return {...set.toJSON(), own: false};
            });
        }
        
        res.status(200).render('sets', {
            title: 'Sets',
            sets: sets,
            coll: coll
        });
    }
    catch (error) {
        console.log(error);
        console.log('Virhe settien haussa.')
    }
};

// GET /sets/:number (get a set by number)
const getSetNumber = async (req, res) => {
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
    try {
        const set = await setsModel.setNumber(req.params.number);
        if (set) {
            if (req.session.coll) {
                const owner = req.session.coll.owner;
                const coll = await collsModel.myCollection(owner);
                if (coll.sets.includes(set.number)) {
                    set.own = true;
                }
            }
            else {
                set.own = false;
            }
            res.status(200).render('set', {
                title: 'Set n:o ' + req.params.number,
                set: set.toJSON(),
                coll: coll
            });
        }
        else {
            res.status(404).render('sets', {
                title: 'Sets',
                info: `Couldn't find the set`,
                coll: coll
            });
        }
    }
    catch (error) {
        console.log(error);
        console.log('Virhe setin haussa (nro)');
        res.render('Sets', {
            title: 'Sets',
            info: 'Something went wrong',
            coll: coll
        });
    }
}

// POST /sets/addsettocoll (add set to collection in db)
const addSetToColl = async (req, res) => {
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
    const owner = coll.owner;
    const number = req.body.number;
    try {
        if (await collsModel.addSetToColl(owner, number)) {
            const s = await setsModel.setNumber(number);
            const set = {...s.toJSON(), own: true};
            res.status(200).render('set', {
                info: 'Set added to your collection',
                title: 'Set n:o ' + req.params.number,
                set: set,
                coll: coll
            });
        }
        else {
            console.log('Virhe setin lisäämisessä kokoelmaan (controller)');
            res.status(500).redirect(`/sets/${number}`);
        }
        
    }
    catch (error) {
        console.log(error);
        console.log('Virhe setin lisäämisessä kokoelmaan (model).');
    }
};

// POST /sets/removesetfromcoll (remove set from collection in db)
const removeSetFromColl = async (req, res) => {
    let coll = {};
    if (req.session.coll) { coll = req.session.coll; }
    const owner = coll.owner;
    const number = req.body.number;
    try {
        if (await collsModel.removeSetFromColl(owner, number)) {
            const s = await setsModel.setNumber(number);
            const set = {...s.toJSON(), own: false};
            res.status(200).render('set', {
                info: 'Set removed from your collection',
                title: 'Set n:o ' + req.params.number,
                set: set,
                coll: coll
            });
        }
        else {
            console.log('Virhe setin poistamisessa kokoelmasta (controller)');
            res.status(500).redirect(`/sets/${number}`);
        }
        
    }
    catch (error) {
        console.log(error);
        console.log('Virhe setin poistamisessa kokoelmasta (model).');
    }
};

module.exports = {
    getSets, getSetNumber, addSetToColl, removeSetFromColl
};