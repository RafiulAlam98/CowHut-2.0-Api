import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { OrderService } from './order.service'

const CreateOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await OrderService.orderCow(data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is crerated  successfully',
    data: result,
  })
})

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrderService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  })
})

export const OrderController = {
  CreateOrder,
  getAllOrder,
}
