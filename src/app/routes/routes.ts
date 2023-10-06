import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/users/user.route'

const router = express.Router()
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes.router,
  },
  {
    path: '/users',
    route: UserRoutes.router,
  },
  {
    path: '/admins',
    route: UserRoutes.router,
  },
  {
    path: '/admins',
    route: AuthRoutes.router,
  },
  {
    path: '/auth',
    route: AuthRoutes.router,
  },

  // {
  //   path: '/admins',
  //   route: AdminRoutes.router,
  // },
  // {
  //   path: '/cows',
  //   route: CowRoutes.router,
  // },
  // {
  //   path: '/order',
  //   route: OrderRoutes.router,
  // },
  // {
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
