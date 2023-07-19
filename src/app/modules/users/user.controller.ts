import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { UserService } from './user.service'

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const { seller, ...user } = req.body
  console.log(seller, user)
  const result = await UserService.createSellerService(seller, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully',
    data: result,
  })
})

const createBuyer = catchAsync(async (req: Request, res: Response) => {
  const { buyer, ...user } = req.body
  const result = await UserService.createBuyerService(buyer, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer created successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...user } = req.body

  const result = await UserService.createAdmin(admin, user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUserService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully!',
    data: result,
  })
})

export const UserController = {
  createSeller,
  createBuyer,
  getAllUsers,
  getSingleUser,
  createAdmin,
}
