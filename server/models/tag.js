const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
    name: { type: String, unique: true, index: true, required: true }
});

module.exports = mongoose.model('Tag', Tag);