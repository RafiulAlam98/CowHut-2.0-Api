import { Model, Types } from 'mongoose'
import { IAdmin } from '../admin/admin.interface'
import { IBuyer } from '../buyer/buyer.interface'
import { ISeller } from '../seller/seller.interface'

export type IUser = {
  userId: string
  password: string
  role: string
  seller: Types.ObjectId | ISeller
  buyer: Types.ObjectId | IBuyer
  admin: Types.ObjectId | IAdmin
}
export type UserModel = Model<IUser>
