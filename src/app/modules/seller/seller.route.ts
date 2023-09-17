import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { SellerController } from './seller.controller'

const router = express.Router()

router.get('/:id', SellerController.getSingleSeller)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), SellerController.updateSeller)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), SellerController.deleteSeller)
router.get('/', SellerController.getAllSeller)

export const SellerRoutes = {
  router,
}
