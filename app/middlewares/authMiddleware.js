import jwt from 'jsonwebtoken';

import { redisInstance } from '../models/db.js'
import { unAuthorizeUser } from '../utils/helpers.js'
import { SECRET } from '../config/config'

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

export const checkAuthSocket = (socket, next) => {
  const token = socket.request._query.token
  if (!token) {
    return ;
  }

  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) {
      return ;
    } else {
      socket.currentUser = decoded
      return next();
    }
  })
}

export const checkAdmin = socket => callback => {
  if (socket.currentUser && socket.currentUser.role === "ROLE_ADMIN") {
    return callback()
  }
  return f => f;
}
