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

export const checkAuthSocket = (socket, next) => {
  // const token = socket.request._query.token
  // if (!token) {
  //   return ;
  // }

  // jwt.verify(token, process.env.SECRET, function(err, decoded) {
  //   console.log(err);
  //   if (err) {
  //     return ;
  //   } else {
  //     socket.currentUser = decoded
  //     console.log(decoded);
  //     next();
  //   }
  // })

  next();

}

export const checkAdmin = (req, res, next) => {
  if (req.currentUser && req.currentUser.role === "ROLE_ADMIN") {
    return next()
  }
  return res.status(403).json({ message: 'Forbidden' })
}
