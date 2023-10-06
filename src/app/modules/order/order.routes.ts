import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { OrderController } from './order.controller'

const router = express.Router()

router.post('/', auth(ENUM_USER_ROLE.BUYER), OrderController.CreateOrderCow)
router.get('/', auth(ENUM_USER_ROLE.SELLER), OrderController.getAllOrders)

export const OrderRoutes = {
  router,
}
