const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    // not sure we will use this
    category: { type: String, required: false }
});

module.exports = mongoose.model('Tag', Tag);