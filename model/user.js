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

// Hash the password before saving to the database
schema.pre('save', async function (next) {
  try {
    // Only hash the password if it is modified or new
    if (this.isModified('password') || this.isNew) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Add a method to compare passwords
schema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

var user = new mongoose.model('User', schema);
module.exports = user;
