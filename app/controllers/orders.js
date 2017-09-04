import { Router } from 'express'
import { checkAuth } from "../middlewares/authMiddleware";

const router = Router()

router.post('/', checkAuth, (req, res) => {
  res.json('Message saved!')
})

export default router
