const Job = require('./../models/jobModel');
const Proposal = require('./../models/proposalModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createJob = factory.createOne(Job);

exports.getAllJobs = factory.getAll(Job);

exports.getJob = factory.getOne(Job, { path: 'proposals' });

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
