const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    unique: true,
    trim: true,
    maxlength: [30, 'Username must have less or equal than 20 characters'],
    minlength: [5, 'Username must have more or equal than 5 characters'],
    validate: {
      validator: function(value) {
        return validator.matches(value, '^[a-zA-Z0-9_.-]*$');
      },
      message: 'username must only contain characters , numbers or _ . -'
    }
  },
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
    trim: true,
    maxlength: [
      20,
      "User's first name must have less or equal than 20 characters"
    ]
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
    trim: true,
    maxlength: [
      20,
      "User's last name must have less or equal than 20 characters"
    ]
  },
  type: {
    type: String,
    required: [true, 'Please select the account type'],
    enum: {
      values: ['client', 'freelancer', 'admin'],
      message: 'Please select from [client, freelancer, admin]'
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
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
