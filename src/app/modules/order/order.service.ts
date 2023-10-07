import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiError'
import { Cow } from '../cow/cow.model'
import { User } from '../users/user.model'
import { IOrder } from './order.interface'
import { Order } from './order.model'

const orderCow = async (order: IOrder) => {
  const session = await mongoose.startSession()
  let newOrderData = null
  try {
    session.startTransaction()

    const cow = await Cow.findById(order.cow).session(session)
    if (!cow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found')
    }

    const sellerId = cow.seller

    // Check if the cow is available for sale
    if (cow.label !== 'for sale') {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'The cow is not available for sale',
      )
    }

    // Find the seller
    const seller = await User.findOne({ _id: sellerId }).session(session)

    if (!seller) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller not found')
    }

    // Find the buyer
    const buyer = await User.findById(order.buyer).session(session)
    if (!buyer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer not found')
    }

    // Check if the buyer has enough budget to buy the cow
    if (buyer.budget! < cow.price) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Buyer does not have enough budget to buy the cow',
      )
    }

    // Update the cow's status to sold
    cow.label = 'sold out'
    await cow.save()

    // Transfer money from buyer to seller
    seller.income! += cow.price
    buyer.budget! -= cow.price

    await seller.save()
    await buyer.save()

    const newOrder = await Order.create(
      {
        cow: cow._id,
        buyer: buyer._id,
      },
      { session },
    )

    newOrderData = newOrder[0]

    // Populate the 'buyer' field in the newOrder document
    const populatedOrder = await Order.findById(newOrderData._id)
      .populate('buyer')
      .populate('cow')

    await session.commitTransaction()
    await session.endSession()
    return populatedOrder
  } catch (ApiError) {
    await session.abortTransaction()
    await session.endSession()
    throw ApiError
  }
}

//getAllOrder Data
const getAllOrders = async () => {
  const result = await Order.find({}).populate('cow').populate('buyer')
  return result
}

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id).populate('cow').populate('buyer')
  return result
}

export const OrderService = {
  orderCow,
  getAllOrders,
  getSingleOrder,
}
