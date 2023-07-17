import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../errors/ApiError'
import { IBuyer } from '../buyer/buyer.interface'
import { Buyer } from '../buyer/buyer.model'
import { ISeller } from '../seller/seller.interface'
import { Seller } from '../seller/seller.model'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateBuyerId, generateSellerId } from './user.utils'

//seller service
const createSellerService = async (
  seller: ISeller,
  user: IUser,
): Promise<IUser | null> => {
  //set password
  if (!user.password) {
    user.password = config.password as string
  }

  //set role
  user.role = 'seller'

  let newAllUserData = null

  //session
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const id = await generateSellerId()
    user.userId = id
    seller.sellerId = id

    //seller create
    const newSeller = await Seller.create([seller], { session })
    if (!newSeller) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create seller')
    }

    user.seller = newSeller[0]._id

    //user create
    const newUser = await User.create([user], { session })
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create a User')
    }

    newAllUserData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newAllUserData) {
    newAllUserData = await User.findOne({
      userId: newAllUserData.userId,
    }).populate({
      path: 'seller',
    })
  }
  return newAllUserData
}

//buyer service
const createBuyerService = async (
  buyer: IBuyer,
  user: IUser,
): Promise<IUser | null> => {
  //set password
  if (!user.password) {
    user.password = config.password as string
  }

  //set role
  user.role = 'buyer'

  let newAllUserData = null

  //session
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const id = await generateBuyerId()
    user.userId = id
    buyer.buyerId = id

    //seller create
    const newBuyer = await Buyer.create([buyer], { session })
    if (!newBuyer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create buyer')
    }

    user.buyer = newBuyer[0]._id

    //user create
    const newUser = await User.create([user], { session })
    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create a User')
    }

    newAllUserData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newAllUserData) {
    newAllUserData = await User.findOne({
      userId: newAllUserData.userId,
    }).populate({
      path: 'buyer',
    })
  }
  return newAllUserData
}

//get all users
const getAllUserService = async () => {
  const result = await User.find({})
  return result
}

//get single user
const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}

export const UserService = {
  createSellerService,
  createBuyerService,
  getAllUserService,
  getSingleUser,
}
