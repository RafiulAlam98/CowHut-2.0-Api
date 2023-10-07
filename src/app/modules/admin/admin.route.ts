import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { AdminController } from './admin.controller'

const router = express.Router()

router.get('/', auth(ENUM_USER_ROLE.ADMIN), AdminController.getAllAdmin)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), AdminController.getSingleAdmin)

export const AdminRoutes = {
  router,
}
