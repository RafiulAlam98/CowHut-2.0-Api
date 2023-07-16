import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { UserService } from './user.service'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user, ...seller } = req.body
  const result = await UserService.createSellerService(seller, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully',
    data: result,
  })
})
export const UserController = {
  createUser,
}
