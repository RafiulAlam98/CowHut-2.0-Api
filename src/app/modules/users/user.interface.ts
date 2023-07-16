import { Model, Types } from 'mongoose'
import { IBuyer } from '../buyer/buyer.interface'
import { ISeller } from '../seller/seller.interface'

export type IUser = {
  userId: string
  password: string
  role: string
  seller: Types.ObjectId | ISeller
  buyer: Types.ObjectId | IBuyer
}
export type UserModel = Model<IUser>
