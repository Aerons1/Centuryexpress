const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  googleId: { type: String }
});

module.exports = mongoose.model('User', userSchema);
