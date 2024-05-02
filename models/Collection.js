const mongoose = require('mongoose');
require('dotenv').config();
const conString = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.qawbvty.mongodb.net/${process.env.DB}`;

mongoose.connect(conString)
.then(() => {
    console.log('Connected to database (collections)');
})
.catch((error) => {
    console.log(error);
    console.log('Virhe tietokantayhteydessä.');
});

// Collection Schema
const collSchema = new mongoose.Schema( {
    owner: String,
    password: String,
    sets: Array,
    parts: Array
});

const Coll = mongoose.model('Coll', collSchema);

// Login
const login = async (owner, password) => {
    try {
        const collection = await Coll.findOne({owner: owner, password: password});
        return collection;
    }
    catch (error) {
        return error;
    }
}

// Get collection by owner
const myCollection = async (owner) => {
    try {
        const collection = await Coll.findOne({owner: owner});
        return collection;
    }
    catch (error) {
        return error;
    }
}

// Add set to collection
const addSetToColl = async (owner, number) => {
    try {
        await Coll.findOneAndUpdate({owner: owner}, {$push: {sets: number}});
        return true;
    }
    catch (error) {
        return false;
    }
}

// Remove set from collection
const removeSetFromColl = async (owner, number) => {
    try {
        await Coll.findOneAndUpdate({owner: owner}, {$pull: {sets: number}});
        return true;
    }
    catch (error) {
        return false;
    }
}

module.exports = {
    login, myCollection, addSetToColl, removeSetFromColl
};