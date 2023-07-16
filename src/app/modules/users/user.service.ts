import mongoose from 'mongoose'
import config from '../../../config'
import { ISeller } from '../seller/seller.interface'
import { IUser } from './user.interface'
import { generateSellerId } from './user.utils'

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

  const newAllUserData = null

  //session
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const id = await generateSellerId()
    user.userId = id
    seller.sellerId = id
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const UserService = {
  createSellerService,
}
