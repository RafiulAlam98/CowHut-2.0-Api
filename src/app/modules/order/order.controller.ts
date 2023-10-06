import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { sendResponse } from '../../../shared/sendResponse'
import { OrderService } from './order.service'

const CreateOrderCow = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.orderCow(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is crerated  successfully',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved  successfully',
    data: result,
  })
})
export const OrderController = {
  getAllOrders,
  CreateOrderCow,
}
