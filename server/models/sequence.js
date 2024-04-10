const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   id: { type: String, required: true },
   maxAdventId: { type: Number },
});

module.exports = mongoose.model('Sequence', sequenceSchema);