import express from 'express'
import { SellerController } from './seller.controller'

const router = express.Router()

router.get('/:id', SellerController.getSingleSeller)
router.patch('/:id', SellerController.updateSeller)
router.delete('/:id', SellerController.deleteSeller)
router.get('/', SellerController.getAllSeller)

export const SellerRoutes = {
  router,
}
