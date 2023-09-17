import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { UserController } from './user.controller'
const router = express.Router()

router.post('/create-seller', UserController.createSeller)
router.post('/create-buyer', UserController.createBuyer)
router.post('/create-admin', UserController.createAdmin)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers)
router.get(
  '/profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.userProfile,
)
router.patch(
  '/profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateUserProfile,
)


export const UserRoutes = {
  router,
}
