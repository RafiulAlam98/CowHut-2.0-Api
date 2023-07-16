import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

router.post('/seller', UserController.createUser)

export const UserRoutes = {
  router,
}
