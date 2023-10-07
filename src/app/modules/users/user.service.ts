import bcrypt from 'bcrypt'
// import bcrypt from 'bcrypt'
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'
import config from '../../../config'
// import { ENUM_USER_ROLE } from '../../../enums/user'
import { ENUM_USER_ROLE } from '../../../enums/user'
import ApiError from '../../errors/ApiError'
import { Admin } from '../admin/admin.model'
import { Buyer } from '../buyer/buyer.model'
import { Seller } from '../seller/seller.model'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (payload: IUser) => {
  const { role, password } = payload
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  )
  payload.password = hashedPassword

  const session = await mongoose.startSession()
  let newUser

  try {
    session.startTransaction()
    if (role === 'seller') {
      const result = await Seller.findOne({ phoneNumber: payload.phoneNumber })
      if (result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists')
      }
      const newSeller = await Seller.create([payload], { session })

      if (!newSeller.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Seller')
      }
    }

    if (role === 'buyer') {
      const result = await Buyer.findOne({ phoneNumber: payload.phoneNumber })
      if (result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists')
      }
      const newBuyer = await Buyer.create([payload], { session })

      if (!newBuyer.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Buyer')
      }
    }

    const isUserExist = await User.findOne({ phoneNumber: payload.phoneNumber })
    if (isUserExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists')
    }

    const result = await User.create([payload], { session })

    if (!result.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create User')
    }

    newUser = result[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (ApiError) {
    await session.abortTransaction()
    await session.endSession()
    throw ApiError
  }
  return newUser
}

// admin service
const createAdmin = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.password as string
  }

  let newAllUserData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const { role, phoneNumber } = user

    if (role === 'admin') {
      const result = await Admin.findOne({ phoneNumber: phoneNumber })
      if (result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Admin Already Exists')
      }
      const newAdmin = await Admin.create([user], { session })
      if (!newAdmin) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin')
      }
      user.admin = newAdmin[0]._id
    }

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

const updateSingleUser = async (
  id: string,
  paylod: IUser,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, paylod, {
    new: true,
  })
  return result
}

const deleteSingleUserService = async (id: string) => {
  const session = await mongoose.startSession()
  const existUser = await User.findById(id)
  let deleteUser

  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const { role, phoneNumber } = existUser

  try {
    session.startTransaction()
    if (role === 'seller') {
      await Seller.deleteOne({ phoneNumber: phoneNumber }, { session })
    }

    if (role === 'buyer') {
      await Buyer.deleteOne({ phoneNumber: phoneNumber }, { session })
    }

    const deletedUser = await User.findByIdAndDelete(id)

    deleteUser = deletedUser
    await session.commitTransaction()
    await session.endSession()
  } catch (ApiError) {
    await session.abortTransaction()
    await session.endSession()
    throw ApiError
  }

  return deleteUser
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
    )

    const phone = buyer?.phoneNumber
    await Buyer.findByIdAndUpdate({ phoneNumber: phone }, payload, {
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
    )
    const phone = seller?.phoneNumber
    await Seller.findByIdAndUpdate({ phoneNumber: phone }, payload, {
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
  createUser,
  getAllUserService,
  getSingleUser,
  createAdmin,
  updateUserProfile,
  userProfile,
  updateSingleUser,
  deleteSingleUserService,
}
