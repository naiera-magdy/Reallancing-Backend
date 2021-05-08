const Job = require('./../models/jobModel');
const factory = require('./handlerFactory');

exports.createJob = factory.createOne(Job);

exports.getAllJobs = factory.getAll(Job);

exports.getJob = factory.getOne(Job, { path: 'proposals' });

exports.updateJob = factory.updateOne(Job);

exports.deleteJob = factory.deleteOne(Job);
