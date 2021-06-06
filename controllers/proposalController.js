const Proposal = require('./../models/proposalModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');

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
