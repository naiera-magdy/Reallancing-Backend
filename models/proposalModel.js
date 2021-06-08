const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const proposalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Proposal must belong to a specified user.']
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Proposal must belong to a specified job.']
    },
    coverLetter: {
      type: String,
      required: [true, 'The proposal needs to have a cover letter.'],
      trim: true,
      minlength: [50, 'The Cover Letter needs to have at least 50 characters.'],
      maxlength: [5000, 'The Cover Letter must have less than 5000 characters.']
    },
    proposedHourlyRate: {
      type: Number,
      min: [10, 'Hourly Rate min value is 10 LE'],
      max: [10000, 'Hourly Rate max value is 10000 LE']
    },
    createdAt: {
      type: Date
    },
    status: {
      type: String,
      default: 'Pending'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Plugin to check if referenced ids exist
proposalSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}'
});

proposalSchema.pre('save', async function(next) {
  this.createdAt = Date();
  next();
});

proposalSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName rating'
  }).populate({
    path: 'job'
  });

  next();
});

const Proposal = mongoose.model('Proposal', proposalSchema);
module.exports = Proposal;
