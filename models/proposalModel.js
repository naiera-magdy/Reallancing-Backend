const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Proposal must belong to a specified user.'],
    select: false
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Proposal must belong to a specified job.'],
    select: false
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
    required: [true, 'A freelancer must have a proposed hourly rate'],
    min: [10, 'Hourly Rate min value is 10 LE'],
    max: [2000, 'Hourly Rate max value is 2000 LE']
  }
});

const Proposal = mongoose.model('Proposal', proposalSchema);
module.exports = Proposal;
