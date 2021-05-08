const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    rating: req.body.rating,
    type: req.body.type === 'client' ? 'client' : 'freelancer' // if we want to add admin, create it from the database directly
  });

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

const getDecodedToken = async req => {
  let token = null;
  //Check for JWT token in header or cookie or URL
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (
    req.query.Authorization &&
    req.query.Authorization.startsWith('Bearer')
  ) {
    token = req.query.Authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else
    throw new AppError(`You're not logged in. Please login to get access`, 401);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  return decoded;
};

const getCurrUserWithToken = async decodedToken => {
  const currUser = await User.findById(decodedToken._id, User.privateUser());
  if (!currUser) {
    throw new AppError(
      'The user belonging to this token does no longer exist.',
      401
    );
  }
  if (currUser.changedPasswordAfter(currUser, decodedToken.iat)) {
    throw new AppError(
      'User recently changed his password. Please login again',
      401
    );
  }
  return currUser;
};

exports.protectRoutes = catchAsync(async (req, res, next) => {
  const decodedToken = await getDecodedToken(req);
  const currentUser = await getCurrUserWithToken(decodedToken);
  req.user = currentUser.publicUserInfo();
  next();
});
