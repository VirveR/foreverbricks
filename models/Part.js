const mongoose = require('mongoose');
require('dotenv').config();
const conString = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.qawbvty.mongodb.net/${process.env.DB}`;

mongoose.connect(conString)
.then(() => {
    console.log('Connected to database (parts)');
})
.catch((error) => {
    console.log(error);
    console.log('Virhe tietokantayhteydessä.');
});

// Part Schema
const partSchema = new mongoose.Schema( {
    number: String,
    type: String,
    size: String,
    versions: Array
});

const Part = mongoose.model('Part', partSchema);

// Get all parts
const allParts = async () => {
    const parts = await Part.find().sort({type:1, size:1});
    return parts;
}

// Get part by number
const partNumber = async (number) => {
    try {
        const partNo = await Part.findOne({number: number});
        return partNo;
    }
    catch (error) {
        return error;
    }
}

// Add new part
const addPart = async (part) => {
    try {
        const newPart = new Part(part);
        await newPart.save();
        return true;
    }
    catch (error) {
        return false;
    }
}

// Add a version in a part
const addVersion = async (number, version) => {
    try {
        await Part.findOneAndUpdate({number: number}, {$push: {versions: version}});
        return true;
    }
    catch (error) {
        return false;
    }
}

module.exports = {
    allParts, partNumber, addPart, addVersion
};