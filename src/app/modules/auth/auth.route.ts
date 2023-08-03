import express from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.put('/login', AuthController.loginUser)

export const AuthRoutes = {
  router,
}
