require('dotenv').config()

export const SECRET = process.env.SECRET || 'fd123@#423fdsa54234f6gtredhg'
export const DATABASE_URL = process.env.DB_URL || 'mongodb://localhost:27017/icomrade'
export const REDIS_URL = process.env.REDIS_URL || '127.0.0.1'
export const REDIS_PORT = process.env.REDIS_PORT || '6379'
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ''
