import mongoose from 'mongoose'

import db from './db.js'

const postSchema = mongoose.Schema({
  "apartmentId": String,
  "approved": Boolean,
  "available": Boolean,
  "bathrooms": Number,
  "bedrooms": Number,
  "city": String,
  "finishedSqFt": Number,
  "heatingSourcesGas": String,
  "id": Number,
  "imageUrls": [{
    "apartmentId": String,
    "id": Number,
    "url": String
  }],
  "latitude": String,
  "longitude": String,
  "lotSizeSqFt": Number,
  "numFloors": String,
  "owner": String,
  "parkingType": String,
  "postDate": Date,
  "price": Number,
  "process": String,
  "rooms": String,
  "street": String,
  "viewPoint": String,
  "yearBuilt": String,
  "yearUpdated": String
})

export default mongoose.model('Post', postSchema)
