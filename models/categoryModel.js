const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `The Category must have a name`],
    unique: [true, 'The Category name must be unique']
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
