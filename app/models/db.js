import mongoose from 'mongoose'
import redis from 'redis'

import { DATABASE_URL } from '../config/config.js'

mongoose.connect(DATABASE_URL)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', (callback) => {
  console.log('db connected')
})


export const redisInstance = redis.createClient();

export default db
