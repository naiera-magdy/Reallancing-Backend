const User = require('./../models/userModel');
const Freelancer = require('./../models/freelancerModel');
const Job = require('./../models/jobModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const uploadAWSImage = require('../utils/uploadAWSImage');

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

exports.updateMe = catchAsync(async (req, res, next) => {
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
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
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

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

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
