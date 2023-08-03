import { Model, Types } from 'mongoose'
import { IAdmin } from '../admin/admin.interface'
import { IBuyer } from '../buyer/buyer.interface'
import { ISeller } from '../seller/seller.interface'

export type IUser = {
  userId: string
  phoneNumber: string
  password: string
  role: string
  needsPasswordChange: true | false
  seller: Types.ObjectId | ISeller
  buyer: Types.ObjectId | IBuyer
  admin: Types.ObjectId | IAdmin
}
export type UserModel = {
  isUserExist(
    phoneNumber: string,
  ): Promise<
    Pick<IUser, 'phoneNumber' | 'password' | 'needsPasswordChange' | 'role'>
  >

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>
