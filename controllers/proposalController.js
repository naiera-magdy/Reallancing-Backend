const Proposal = require('./../models/proposalModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createProposal = catchAsync(async (req, res, next) => {
  const newProposal = await Proposal.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      Proposal: newProposal
    }
  });
});

exports.getAllProposals = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Proposal.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const proposals = await features.query;

  res.status(200).json({
    status: 'success',
    results: proposals.length,
    data: {
      proposals
    }
  });
});

exports.getProposal = catchAsync(async (req, res, next) => {
  const proposal = await Proposal.findById(req.params.id);

  if (!proposal) {
    return next(new AppError('No Proposal found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      proposal
    }
  });
});

exports.updateProposal = catchAsync(async (req, res, next) => {
  const proposal = await Proposal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!proposal) {
    return next(new AppError('No Proposal found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      proposal
    }
  });
});

exports.deleteProposal = catchAsync(async (req, res, next) => {
  const proposal = await Proposal.findByIdAndDelete(req.params.id);

  if (!proposal) {
    return next(new AppError('No Proposal found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
