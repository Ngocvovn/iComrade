import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import db from './db.js'

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ROLE_USER' },
  created_at: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      next();
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    })
  })

};

export default mongoose.model('user', userSchema)
