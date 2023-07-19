import httpStatus from 'http-status'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/pagination'
import ApiError from '../../errors/ApiError'
import { ICow } from './cow.interface'
import { Cow } from './cow.model'

const createCowService = async (cow: ICow): Promise<ICow> => {
  const createdCowService = await Cow.create(cow)
  if (!createCowService) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, '')
  }
  return createdCowService
}

const getAllCowsService = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICow[]>> => {
  const { page, skip, limit } =
    paginationHelpers.calculatePagination(paginationOptions)
  const result = await Cow.find().sort().skip(skip).limit(limit)
  const total = await Cow.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getSingleCowService = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id)
  return result
}

export const updateSingleCowService = async (
  id: string,
  paylod: ICow,
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, paylod, {
    new: true,
  })
  return result
}

export const deleteSingleCowService = async (
  id: string,
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id)
  return result
}

export const CowService = {
  createCowService,
  getAllCowsService,
  getSingleCowService,
  updateSingleCowService,
  deleteSingleCowService,
}
