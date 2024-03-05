var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
  userName: {
    type: String,
    default: '',
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Requires a userName have only letters and numbers
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: 'Username must only contain letters and numbers.',
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Requires at least one uppercase letter, one number, and one special character. must be 8 char in length
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        'Password must have at least one uppercase letter, one number, and one special character.',
    },
  },
});

var user = new mongoose.model('User', schema);
module.exports = user;
