import express from 'express'
import { CowController } from './cow.controller'

const router = express.Router()
router.post('/addcows', CowController.createCowController)
router.get('/:id', CowController.getSingleCowController)
router.patch('/:id', CowController.updateSingleCowController)
router.delete('/:id', CowController.deleteSingleCowController)
router.get('/', CowController.getAllCowsController)

export const CowRoutes = {
  router,
}
