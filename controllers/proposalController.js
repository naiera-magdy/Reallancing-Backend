const Proposal = require('./../models/proposalModel');
const factory = require('./handlerFactory');

exports.setJobUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.job) req.body.job = req.params.jobId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createProposal = factory.createOne(Proposal);

exports.getAllProposals = factory.getAll(Proposal);

exports.getProposal = factory.getOne(Proposal);

exports.updateProposal = factory.updateOne(Proposal);

exports.deleteProposal = factory.deleteOne(Proposal);
