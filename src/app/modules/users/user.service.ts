import bcrypt from 'bcrypt'
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'
import config from '../../../config'
import { ENUM_USER_ROLE } from '../../../enums/user'
import ApiError from '../../errors/ApiError'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IBuyer } from '../buyer/buyer.interface'
import { Buyer } from '../buyer/buyer.model'
import { ISeller } from '../seller/seller.interface'
import { Seller } from '../seller/seller.model'
import { IUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateBuyerId,
  generateSellerId,
} from './user.utils'

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

// admin service
const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.password as string
  }

  user.role = 'admin'

  let newAllUserData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const id = await generateAdminId()

    user.userId = id
    admin.adminId = id

    const newAdmin = await Admin.create([admin], { session })
    if (!newAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    user.admin = newAdmin[0]._id

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
      path: 'admin',
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

const userProfile = async (user: JwtPayload | null) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
  }
  const result = await User.find({ phoneNumber: user.phoneNumber })



  return result
}

const updateUserProfile = async (user: JwtPayload | null, payload: any) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
  }

  if (payload.password) {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds),
    )
    payload.password = hashedPassword
  }

  let result

  if (user.role === ENUM_USER_ROLE.BUYER) {
    const buyer = await User.findOne({ phoneNumber: user.phoneNumber })
    if (!buyer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found')
    }

    result = await User.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      { password: payload.password },
      { new: true },
    ).populate('buyer')
    const id = buyer?.buyer
    await Buyer.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    })
  } else if (user.role === ENUM_USER_ROLE.SELLER) {
    const seller = await User.findOne({ phoneNumber: user.phoneNumber })
    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'seller not found')
    }

    result = await User.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      { password: payload.password },
      { new: true },
    ).populate('seller')
    const id = seller?.seller
    await Seller.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    })
  } else if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await Admin.findOneAndUpdate(
      { phoneNumber: user.phoneNumber },
      payload,
      { new: true },
    )
  }

  return result
}

export const UserService = {
  createSellerService,
  createBuyerService,
  getAllUserService,
  getSingleUser,
  createAdmin,
  updateUserProfile,
  userProfile,
}
