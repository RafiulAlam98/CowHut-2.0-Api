import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

router.post('/create-seller', UserController.createSeller)
router.post('/create-buyer', UserController.createBuyer)
router.post('/create-admin', UserController.createAdmin)
router.get('/:id', UserController.getSingleUser)
router.get('/', UserController.getAllUsers)

export const UserRoutes = {
  router,
}
