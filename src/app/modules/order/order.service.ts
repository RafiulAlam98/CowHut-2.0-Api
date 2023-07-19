import mongoose from 'mongoose'
import { Buyer } from '../buyer/buyer.model'
import { Cow } from '../cow/cow.model'
import { Seller } from '../seller/seller.model'
import { IOrder } from './order.interface'
import { Order } from './order.model'

const orderCow = async (order: IOrder) => {
  const session = await mongoose.startSession()
  let newOrderData = null
  try {
    session.startTransaction()
    const cow = await Cow.findById(order.cow).session(session)
    if (!cow) {
      throw new Error('Cow not found')
    }
    if (cow.label !== 'for sale') {
      throw new Error('The cow is not available for sale')
    }
    const seller = await Seller.findById(cow.seller).session(session)
    if (!seller) {
      throw new Error('Seller not found')
    }
    const buyer = await Buyer.findById(order.buyer).session(session)
    if (!buyer) {
      throw new Error('Buyer not found')
    }
    if (buyer.budget < cow.price) {
      throw new Error('Buyer does not have enough budget to buy the cow')
    }
    cow.label = 'sold out'
    await cow.save()
    seller.income += cow.price
    buyer.budget -= cow.price
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
    const populatedOrder = await Order.findById(newOrderData._id)
      .populate('buyer')
      .populate('cow')

    await session.commitTransaction()
    await session.endSession()
    return populatedOrder
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const getAllOrderService = async () => {
  const result = Order.find()
  return result
}
export const OrderService = {
  orderCow,
  getAllOrderService,
}
