import mongoose from 'mongoose'
import redis from 'redis'

import { DATABASE_URL, REDIS_URL, REDIS_PORT, REDIS_PASSWORD } from '../config/config.js'

mongoose.connect(DATABASE_URL)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', (callback) => {
  console.log('db connected')
})


export const redisInstance = redis.createClient({ host: REDIS_URL, port: REDIS_PORT, password: REDIS_PASSWORD});

export default db
