const mongoose = require('mongoose');
// const validator = require('validator');
const idValidator = require('mongoose-id-validator');

const jobSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: [true, 'A job must have a headline'],
      trim: true,
      minlength: [10, 'Job headline must have more than 10 characters']
    },
    description: {
      type: String,
      required: [true, 'A job must have a description'],
      trim: true,
      maxlength: [500, 'Job description must have less than 500 characters'],
      minlength: [50, 'Job description must have more than 50 characters']
    },
    skills: {
      type: [String],
      trim: true,
      maxlength: [50, 'Job skill must have less than 50 characters'],
      minlength: [5, 'Job skill must have more than 5 characters']
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'Job category must have less than 50 characters'],
      minlength: [5, 'Job category must have more than 5 characters']
    },
    experience: {
      type: String,
      trim: true,
      enum: {
        values: ['Entry level', 'Intermediate', 'Expert'],
        message: 'Please select from [client, freelancer, admin]'
      }
    },
    minHourlyRate: {
      type: Number,
      required: [true, 'Please enter min rate'],
      min: [10, 'Min Hourly Rate must be above 10 LE'],
      max: [10000, 'Min Hourly Rate must be below 10000 LE']
    },
    maxHourlyRate: {
      type: Number,
      required: [true, 'Please enter max rate'],
      min: [10, 'Max Hourly Rate must be above 10 LE'],
      max: [10000, 'Max Hourly Rate must be below 10000 LE']
    },
    duration: {
      type: String,
      required: [true, 'Please enter job duration'],
      trim: true,
      enum: {
        values: [
          'More than 6 months',
          '3 to 6 months',
          '1 to 3 months',
          'Less than 1 month'
        ],
        message:
          'Choose from |More than 6 months| or |3 to 6 months| or |1 to 3 months| or |Less than 1 month|'
      }
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job must belong to a specific Client.']
    },
    createdAt: {
      type: Date,
      default: Date()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Plugin to check if referenced ids exist
jobSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}'
});

jobSchema.pre('save', async function(next) {
  this.createdAt = Date();
  next();
});

// Virtual populate to get a job's proposals
jobSchema.virtual('proposals', {
  ref: 'Proposal',
  foreignField: 'job',
  localField: '_id'
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
