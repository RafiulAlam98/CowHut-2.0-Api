import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/pagination'
import ApiError from '../../errors/ApiError'
import { cowSearchableFields } from './cow.constant'
import { ICow, ICowFilters } from './cow.interface'
import { Cow } from './cow.model'

const createCowService = async (cow: ICow): Promise<ICow> => {
  const createdCowService = await Cow.create(cow)
  if (!createCowService) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, '')
  }
  return createdCowService
}

const getAllCowsService = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const result = await Cow.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
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
