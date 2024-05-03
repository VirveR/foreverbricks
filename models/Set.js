const mongoose = require('mongoose');
require('dotenv').config();
const conString = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.qawbvty.mongodb.net/${process.env.DB}`;

mongoose.connect(conString)
.then(() => {
    console.log('Connected to database (sets)');
})
.catch((error) => {
    console.log(error);
    console.log('Virhe tietokantayhteydessä.');
});

// Set Schema
const setSchema = new mongoose.Schema( {
    number: String,
    name: String,
    year: Number,
    consists: Array,
    own: Boolean
});

const Set = mongoose.model('Set', setSchema);

// Get all sets
const allSets = async () => {
    const sets = await Set.find().sort({'year':1, 'number':1});
    return sets;
}

// Get set by number
const setNumber = async (number) => {
    try {
        const setNo = await Set.findOne({number: number});
        return setNo;
    }
    catch (error) {
        return error;
    }
}

// Add set to db
const addSet = async (set) => {
    try {
        const newSet = new Set(set);
        await newSet.save();
        return true;
    }
    catch (error) {
        return false;
    }
}

// Get set content length
const lastRow = async (set) => {
    try {
        const set = await setNumber(set);
        return set.consists.length;
    }
    catch (error) {
        return -1;
    }
}

// Add parts to a set in db
const addContent = async (number, content) => {
    try {
        await Set.findOneAndUpdate({number: number}, {$push: {consists: content}});
        return true;
    }
    catch (error) {
        return false;
    }
}

module.exports = {
    allSets, setNumber,
    addSet, lastRow, addContent
};