const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `The Skill must have a name`],
    unique: [true, 'The Skill name must be unique']
  },
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Category'
    }
  ]
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
