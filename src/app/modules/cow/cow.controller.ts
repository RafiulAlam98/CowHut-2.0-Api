import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constant/paginationFields'
import { catchAsync } from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { sendResponse } from '../../../shared/sendResponse'
import { ICow } from './cow.interface'
import { CowService } from './cow.service'

const createCowController = catchAsync(async (req, res) => {
  const { ...cows } = req.body
  const result = await CowService.createCowService(cows)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow added successfully !',
    data: result,
  })
})

const getAllCowsController = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const result = await CowService.getAllCowsService(paginationOptions)
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleCowController = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await CowService.getSingleCowService(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow retrieved successfully!',
    data: result,
  })
})

const updateSingleCowController = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await CowService.updateSingleCowService(id, updatedData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully',
    data: result,
  })
})

const deleteSingleCowController = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await CowService.deleteSingleCowService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully',
    data: result,
  })
})

export const CowController = {
  createCowController,
  getAllCowsController,
  getSingleCowController,
  updateSingleCowController,
  deleteSingleCowController,
}
