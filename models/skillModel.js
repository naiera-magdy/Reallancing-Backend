const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `The Skill must have a name`],
    unique: [true, 'The Skill name must be unique']
  },
  categories: {
    required: [true, 'Categories of a skill must be sent'],
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
      }
    ],
    validate: [
      function(value) {
        return value.length >= 1;
      },
      'A skill must belong to least one Category'
    ]
  }
});
skillSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'categories',
    select: '_id name'
  });
  next();
});
const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
