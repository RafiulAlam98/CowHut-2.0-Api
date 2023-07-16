import express from 'express'
import { BuyerController } from './buyer.controller'
const router = express.Router()

router.get('/', BuyerController.getAllBuyer)

export const BuyerRoutes = {
  router,
}
