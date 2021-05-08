const Proposal = require('./../models/proposalModel');
const factory = require('./handlerFactory');

exports.createProposal = factory.createOne(Proposal);

exports.getAllProposals = factory.getAll(Proposal);

exports.getProposal = factory.getOne(Proposal);

exports.updateProposal = factory.updateOne(Proposal);

exports.deleteProposal = factory.deleteOne(Proposal);
