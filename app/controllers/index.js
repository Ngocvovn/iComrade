import { Router } from 'express'

import authController from './auth.js'

const router = Router()

router.use('/auth', authController)

export default router
 