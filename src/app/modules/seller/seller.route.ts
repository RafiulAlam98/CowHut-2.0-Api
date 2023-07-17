import express from 'express'
import { SellerController } from './seller.controller'

const router = express.Router()

router.get('/', SellerController.getAllSeller)
router.get('/:id', SellerController.getSingleSeller)

export const SellerRoutes = {
  router,
}
