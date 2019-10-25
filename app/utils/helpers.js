import { isEmpty, keys } from "ramda";


export const unAuthorizeUser = res => res.status(401).json({ success: false, message: 'Failed to authenticate token.' })

export const getToken = req => req.headers['x-access-token']
