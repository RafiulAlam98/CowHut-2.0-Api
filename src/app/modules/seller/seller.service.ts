import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiError'
import { User } from '../users/user.model'
import { ISeller } from './seller.interface'
import { Seller } from './seller.model'

const getAllSellerService = async () => {
  const result = await Seller.find()
  return result
}
const getSingleSellerService = async (id: string) => {
  const result = await Seller.findById(id)
  return result
}
const updateSellerService = async (id: string, payload: Partial<ISeller>) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    if (payload.sellerId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller ID must be unchanged')
    }
    const result = await Seller.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    })
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller update failed')
    }

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}
const deleteSellerService = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const result = await Seller.findByIdAndDelete(id)
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller deletion failed')
    }
    const user = await User.deleteOne({ seller: id })
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User deletion failed')
    }
    return user
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const SellerService = {
  getAllSellerService,
  getSingleSellerService,
  updateSellerService,
  deleteSellerService,
}
