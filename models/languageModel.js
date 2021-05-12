const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `The Language must have a name`],
    unique: [true, 'The Language name must be unique']
  }
});

const Language = mongoose.model('Language', languageSchema);
module.exports = Language;
