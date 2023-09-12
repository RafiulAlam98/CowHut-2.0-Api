import express from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.put('/login', AuthController.loginUser)
router.patch('/refresh-token', AuthController.refreshTokenController)

export const AuthRoutes = {
  router,
}
