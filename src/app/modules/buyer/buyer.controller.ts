import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { BuyerService } from './buyer.service'

const getAllBuyer = catchAsync(async (req: Request, res: Response) => {
  const result = await BuyerService.getAllBuyerService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyers retrived successfully',
    data: result,
  })
})

const getSingleBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await BuyerService.getSingleBuyerService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer retrived successfully',
    data: result,
  })
})

const updateBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await BuyerService.updateBuyerService(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer updated successfully',
    data: result,
  })
})

const deleteBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await BuyerService.deleteBuyerService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer deleted successfully',
    data: result,
  })
})

export const BuyerController = {
  getAllBuyer,
  getSingleBuyer,
  updateBuyer,
  deleteBuyer,
}
