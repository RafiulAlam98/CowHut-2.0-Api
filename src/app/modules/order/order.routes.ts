import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { OrderController } from './order.controller'

const router = express.Router()

router.post(
  '/addOrder',
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.CreateOrder,
)
router.get('/', auth(ENUM_USER_ROLE.SELLER), OrderController.getAllOrder)

export const OrderRoutes = {
  router,
}
