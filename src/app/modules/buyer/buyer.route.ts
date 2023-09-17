import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { BuyerController } from './buyer.controller'
const router = express.Router()

router.get('/:id', BuyerController.getSingleBuyer)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BuyerController.updateBuyer)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BuyerController.deleteBuyer)
router.get('/', BuyerController.getAllBuyer)

export const BuyerRoutes = {
  router,
}
