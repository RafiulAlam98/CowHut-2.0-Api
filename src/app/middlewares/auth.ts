import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import ApiError from '../errors/ApiError'

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      //verify token

      let verifiedUser = null
      try {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.refresh_secret as Secret,
        )
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token')
      }

      req.user = verifiedUser

      //role guard
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
export default auth
