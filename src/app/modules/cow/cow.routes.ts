import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { CowController } from './cow.controller'

const router = express.Router()

router.post('/', auth(ENUM_USER_ROLE.SELLER), CowController.createCowController)

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCowController,
)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateSingleCowController,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  CowController.deleteSingleCowController,
)
router.get('/', CowController.getAllCowsController)

export const CowRoutes = {
  router,
}
