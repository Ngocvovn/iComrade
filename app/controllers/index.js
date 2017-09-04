import { Router } from 'express'

import postController from './posts.js'
import authController from './auth.js'

const router = Router()

router.use('/auth', authController)
router.use('/posts', postController)

export default router
