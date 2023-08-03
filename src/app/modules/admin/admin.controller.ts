import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { AdminService } from './admin.service'

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmin()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AdminService.getSingleAdmin(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
}
