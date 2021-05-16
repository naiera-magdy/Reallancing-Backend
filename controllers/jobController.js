const Job = require('./../models/jobModel');
const Proposal = require('./../models/proposalModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setClientId = function(req, res, next) {
  req.body.clientId = req.user.id;
  next();
};
exports.createJob = factory.createOne(Job);

exports.getAllJobs = factory.getAll(Job);

exports.getJob = catchAsync(async (req, res, next) => {
  let query = Job.findById(req.params.id, '+clientId -__v');
  query = query.populate({ path: 'proposals' });
  let doc = await query;

  if (!doc) {
    return next(new AppError(`No Job found with that ID`, 404));
  }
  doc = { ...doc._doc, owner: false };
  if (doc.clientId.toString() === req.user.id.toString()) {
    doc.owner = true;
  }
  doc.clientId = undefined;
  res.status(200).json({
    status: 'success',
    data: doc
  });
});

exports.updateJob = factory.updateOne(Job);

exports.deleteJob = catchAsync(async (req, res, next) => {
  const doc = await Job.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError(`No Job found with that ID`, 404));
  }

  const jobId = req.params.id;
  await Proposal.deleteMany({ job: jobId });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
