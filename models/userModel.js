const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // -------------------------------
  // Thinking of removing username
  // -------------------------------
  // username: {
  //   type: String,
  //   required: [true, 'A user must have a username'],
  //   unique: true,
  //   trim: true,
  //   maxlength: [30, 'Username must have less than 20 characters'],
  //   minlength: [5, 'Username must have more than 5 characters'],
  //   validate: {
  //     validator: function(value) {
  //       return validator.matches(value, '^[a-zA-Z0-9_.-]*$');
  //     },
  //     message: 'username must only contain characters , numbers or _ . -'
  //   }
  // },
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  rating: {
    type: Number,
    default: 1,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  EnteredPassword,
  userPassword
) {
  return bcrypt.compare(EnteredPassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
