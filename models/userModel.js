const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ImageObject = require('./objects/imageObject');

//-------------------------------------------------------------------------
// USER SCHEMA
// ------------------------------------------------------------------------

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A user must have a first name'],
      trim: true,
      maxlength: [20, "User's first name must have less than 20 characters"],
      validate: [validator.isAlpha, 'First name must only contain characters']
    },
    lastName: {
      type: String,
      required: [true, 'A user must have a last name'],
      trim: true,
      maxlength: [20, "User's last name must have less than 20 characters"],
      validate: [validator.isAlpha, 'Last name must only contain characters']
    },
    type: {
      type: String,
      required: [true, 'Please select the account type'],
      enum: {
        values: ['client', 'freelancer', 'admin'],
        message: 'Please select from [client, freelancer]'
      }
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Email is incorrect']
    },
    createdAt: {
      type: Date,
      default: Date()
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
      minlength: 8
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    location: {
      type: String,
      required: [true, 'Please provide a location']
    },
    image: {
      type: [ImageObject],
      default: null
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    rating: {
      type: Number,
      default: 1,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate
userSchema.virtual('proposals', {
  ref: 'Proposal',
  foreignField: 'user',
  localField: '_id'
});

//-------------------------------------------------------------------------
// HOOKS
// ------------------------------------------------------------------------

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//-------------------------------------------------------------------------
// STATICS
// ------------------------------------------------------------------------

//Returns a select options object for private user (remove private data from selection)
userSchema.statics.privateUser = () => {
  return {
    __v: 0
  };
};

//Returns a select options object for public user (remove private data from selection)
userSchema.statics.publicUser = () => {
  return {
    password: 0,
    passwordConfirm: 0,
    passwordChangedAt: 0,
    passwordResetToken: 0,
    passwordResetExpires: 0,
    __v: 0
  };
};

//-------------------------------------------------------------------------
// METHODS
// ------------------------------------------------------------------------

userSchema.methods.correctPassword = async function(
  EnteredPassword,
  userPassword
) {
  return await bcrypt.compare(EnteredPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.publicUserInfo = function() {
  const publicInfo = this.toObject({
    virtuals: true
  });

  const fieldsToExclude = userSchema.statics.publicUser();
  Object.keys(publicInfo).forEach(el => {
    if (publicInfo[el] && fieldsToExclude[el] === 0) {
      delete publicInfo[el];
    }
  });
  return publicInfo;
};

// Used when user wants to reset password
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//-------------------------------------------------------------------------
// CREATE THE USER MODEL
// ------------------------------------------------------------------------

const User = mongoose.model('User', userSchema);
module.exports = User;
