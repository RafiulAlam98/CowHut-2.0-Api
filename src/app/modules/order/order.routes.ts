import express from 'express'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from './../../../enums/user'
import { OrderController } from './order.controller'

const router = express.Router()

router.post('/', auth(ENUM_USER_ROLE.BUYER), OrderController.CreateOrderCow)
router.get('/', auth(ENUM_USER_ROLE.SELLER), OrderController.getAllOrders)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  OrderController.getSingleOrder,
)

export const OrderRoutes = {
  router,
}
