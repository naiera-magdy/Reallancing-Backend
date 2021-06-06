const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const freelancerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `The Freelancer must have a title`]
  },
  overview: {
    type: String,
    required: [true, `The Freelancer must have an overview`],
    minLength: [50, "Freelancer's overview must have more than 50 characters"],
    maxlength: [500, "Freelancer's overview must have less than 500 characters"]
  },
  hourlyRate: {
    type: Number,
    required: [true, 'A freelancer must have an hourly rate'],
    min: [10, 'Hourly Rate min value is 10 LE'],
    max: [2000, 'Hourly Rate max value is 2000 LE']
  },
  education: {
    type: Object,
    university: {
      type: String
      //required: [true, 'Freelancer must have an experience level']
    },
    garduationYear: {
      type: Number,
      min: [1950, "Grad Date can't be before 1950"],
      max: [2030, "Grad Date can't be after 2030"]
      //required: [true, 'Freelancer must have an experience level']
    },
    required: [true, 'Freelancer must have an education']
  },
  workExperience: [
    {
      company: String,
      jobTitle: String,
      durationInMonths: {
        type: Number,
        min: [1, "Can't work less than 1 month"]
      }
    }
  ],
  experienceLevel: {
    type: String,
    enum: {
      values: ['beginner', 'intermediate', 'expert'],
      message: 'Please select from [beginner, intermediate, expert]'
    },
    required: [true, 'Freelancer must have an experience level']
  },
  category: {
    type: String,
    required: [true, 'Freelancer must have a category']
  },
  skills: {
    type: [
      {
        type: String
      }
    ],
    validate: [
      function(value) {
        return value.length >= 1;
      },
      'Freelancer must have at least one skill'
    ]
  },
  languages: [
    {
      name: String,
      level: {
        type: String,
        enum: {
          values: ['basic', 'conversational', 'fluent', 'native or bilingual'],
          message:
            'Please select from [basic, conversational, fluent, native or bilingual]'
        }
      }
    }
  ],
  userInfo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, `The Freelancer's user info has to be specifed`]
  }
});

// Plugin to check if referenced ids exist
freelancerSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}'
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);
module.exports = Freelancer;
