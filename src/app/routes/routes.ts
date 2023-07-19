import express from 'express'
import { BuyerRoutes } from '../modules/buyer/buyer.route'
import { CowRoutes } from '../modules/cow/cow.routes'
import { SellerRoutes } from '../modules/seller/seller.route'
import { UserRoutes } from '../modules/users/user.route'

const router = express.Router()
const moduleRoutes = [
  {
    path: '/auth/signup',
    route: UserRoutes.router,
  },
  {
    path: '/users',
    route: UserRoutes.router,
  },
  {
    path: '/seller',
    route: SellerRoutes.router,
  },
  {
    path: '/buyer',
    route: BuyerRoutes.router,
  },
  {
    path: '/cows',
    route: CowRoutes.router,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
