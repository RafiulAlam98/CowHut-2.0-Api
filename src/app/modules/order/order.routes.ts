import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()

router.post('/addOrder', OrderController.CreateOrder)
router.get('/', OrderController.getAllOrder)

export const OrderRoutes = {
  router,
}
