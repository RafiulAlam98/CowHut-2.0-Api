import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { SellerService } from './seller.service'

const getAllSeller = catchAsync(async (req: Request, res: Response) => {
  const result = await SellerService.getAllSellerService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sellers retrived successfully',
    data: result,
  })
})

const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await SellerService.getSingleSellerService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller retrived successfully',
    data: result,
  })
})
export const SellerController = {
  getAllSeller,
  getSingleSeller,
}
