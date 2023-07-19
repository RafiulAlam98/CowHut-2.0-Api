import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiError'
import { User } from '../users/user.model'
import { IBuyer } from './buyer.interface'
import { Buyer } from './buyer.model'

const getAllBuyerService = async () => {
  const result = await Buyer.find()
  return result
}
const getSingleBuyerService = async (id: string) => {
  const result = await Buyer.findById(id)
  return result
}
const updateBuyerService = async (id: string, payload: Partial<IBuyer>) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    if (payload.buyerId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer ID must be unchanged')
    }
    const result = await Buyer.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    })
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer update failed')
    }

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}
const deleteBuyerService = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const result = await Buyer.findByIdAndDelete(id)
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer deletion failed')
    }
    const user = await User.deleteOne({ buyer: id })
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

export const BuyerService = {
  getAllBuyerService,
  getSingleBuyerService,
  updateBuyerService,
  deleteBuyerService,
}
