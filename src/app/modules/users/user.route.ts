import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { UserController } from './user.controller'
const router = express.Router()

router.post('/signup', UserController.createUser)
router.post('/create-admin', UserController.createAdmin)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateSingleUser,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser,
)

router.patch(
  '/my-profile ',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateUserProfile,
)

router.get(
  '/my-profile ',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.userProfile,
)


export const UserRoutes = {
  router,
}
