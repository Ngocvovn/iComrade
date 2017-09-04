import jwt from 'jsonwebtoken';
import { redisInstance } from '../models/db.js'
import { unAuthorizeUser } from '../utils/helpers.js'

export const checkAuth = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return unAuthorizeUser(res)
  }

  redisInstance.sismember('logOutTokens', token, (err, reply) => {
    if (err) throw err;
    if (reply) return unAuthorizeUser(res)

    jwt.verify(token, req.app.get('secret'), function(err, decoded) {
      if (err) {
        return unAuthorizeUser(res)
      } else {
        req.currentUser = decoded
        next();
      }
    })

  })
}

export const checkAdmin = (req, res, next) => {
  if (req.currentUser && req.currentUser.role === "ROLE_ADMIN") {
    return next()
  }
  return res.status(403).json({ message: 'Forbidden' })
}
