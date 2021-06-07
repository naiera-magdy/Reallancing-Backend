const User = require('./../models/userModel');
const Freelancer = require('./../models/freelancerModel');
const Job = require('./../models/jobModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const uploadAWSImage = require('../utils/uploadAWSImage');
const Proposal = require('../models/proposalModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  let doc = await User.findById(req.params.id);
  if (!doc) {
    return next(new AppError(`No User found with that ID`, 404));
  }

  if (doc.type === 'freelancer') {
    doc = {
      ...doc._doc,
      freelancerInfo: await Freelancer.findOne({
        userInfo: req.params.id
      })
    };
  }
  res.status(200).json({
    status: 'success',
    data: doc
  });
});
// exports.getUserProposals = factory.getOne(User, { path: 'proposals' });
exports.getAllUsers = factory.getAll(User);

exports.deleteUser = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError(`No User found with that ID`, 404));
  }

  if (doc.type === 'freelancer') {
    await Freelancer.deleteOne({ userInfo: req.params.id });
    await Proposal.deleteMany({ user: req.params.id });
  } else {
    await Job.deleteMany({ clientId: req.params.id });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getMyJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find({ clientId: req.user.id });
  res.status(200).json({
    status: 'success',
    data: jobs
  });
});

const updateAvatar = async (fileData, userId) => {
  if (!fileData) throw new AppError('Invalid file uploaded', 400);

  const dimensions = [
    [640, 640],
    [300, 300],
    [60, 60]
  ];
  const qualityNames = ['High', 'Medium', 'Low'];
  const imgObjects = await uploadAWSImage(
    fileData,
    'user',
    userId,
    dimensions,
    qualityNames
  );

  const body = {
    image: imgObjects
  };

  await User.findByIdAndUpdate(userId, body, {
    new: true
  });
};

exports.updateAvatar = catchAsync(async (req, res, next) => {
  await updateAvatar(req.files.image.data, req.user.id);
  res.status(202).json({
    status: 'success',
    message: 'Avatar image updated successfully'
  });
});

exports.getUserStats = catchAsync(async (req, res, next) => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: '$type',
        numUsers: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    },
    {
      $sort: { avgRating: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getFreelancerStats = catchAsync(async (req, res, next) => {
  const stats = await Freelancer.aggregate([
    {
      $group: {
        _id: '$experienceLevel',
        numFreelancers: { $sum: 1 },
        avgHourlyRate: { $avg: '$hourlyRate' },
        minHourlyRate: { $min: '$hourlyRate' },
        maxHourlyRate: { $max: '$hourlyRate' }
      }
    },
    {
      $sort: { avgHourlyRate: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
