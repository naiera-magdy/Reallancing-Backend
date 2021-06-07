const Proposal = require('./../models/proposalModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('./../utils/email');
const User = require('../models/userModel');
const Job = require('../models/jobModel');

const getProposals = async function(type, id, res) {
  if (type === 'admin') {
    const data = await Proposal.find();
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data
    });
  } else if (type === 'freelancer') {
    const data = await Proposal.find({ user: id });
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data
    });
  } else {
    const data = await Proposal.find({ job: id });
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data
    });
  }
};
exports.setJobUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.job) req.body.job = req.params.jobId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createProposal = factory.createOne(Proposal);

exports.getAllProposals = catchAsync(async (req, res, next) => {
  switch (req.user.type) {
    case 'admin':
      getProposals(req.user.type, req.user.id, res);
      break;
    case 'freelancer':
      getProposals(req.user.type, req.user.id, res);
      break;
    case 'client':
      getProposals(req.user.type, req.body.job, res);
      break;
    default:
      next();
  }
});

exports.getProposal = factory.getOne(Proposal);

exports.updateProposal = factory.updateOne(Proposal);

exports.deleteProposal = factory.deleteOne(Proposal);

exports.sendProposalAcceptance = catchAsync(async (req, res, next) => {
  const proposal = await Proposal.findById(req.params.id);
  const user = await User.findById(proposal.user);
  const job = await Job.findById(proposal.job);
  const client = await User.findById(job.clientId);

  if (!proposal) {
    return next(new AppError(`No Proposal found with that ID`, 404));
  }

  // Send acceptance to user's email and set proposal status to accepted
  try {
    // in the constructor put emty url as we don't need one
    await new Email(user, '').sendProposalAcceptance(job, client);
    proposal.status = 'Accepted';
    await proposal.save();

    res.status(200).json({
      status: 'success',
      message: 'Email sent successfully!'
    });
  } catch (err) {
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Proposal.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            month: {
              $month: '$createdAt'
            },
            total: { $sum: 1 }
          }
        }
      },
      {
        $sort: {
          '_id.month': -1
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
