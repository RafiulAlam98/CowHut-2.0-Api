import express from 'express'
import { SellerController } from './seller.controller'

const router = express.Router()

router.get('/', SellerController.getAllSeller)

export const SellerRoutes = {
  router,
}
