const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    name: String,
    city: String,
    postalCode: String,
    address: String,
    phone: String,
    email: String,
    website: String
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
