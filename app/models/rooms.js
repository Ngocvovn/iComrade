import mongoose from 'mongoose'

import db from './db.js'

const roomSchema = mongoose.Schema({
  "name": { type: String, unique: true },
  "description": String
});

const model = mongoose.model('Room', roomSchema);

model.getAll = function() {
  return new Promise((resolve, reject) => {
    this.find({}, (err, rooms) => {
      if (err) {
        reject(err);
      }
      resolve(rooms);
    })
  })
};

export default model
