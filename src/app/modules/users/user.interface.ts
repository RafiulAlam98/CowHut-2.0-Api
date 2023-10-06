import { Model, Types } from 'mongoose'
import { UserName } from '../../../interface/username'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  phoneNumber: string
  password: string
  role: 'seller' | 'buyer' | 'admin'
  needsPasswordChange?: true | false
  name: UserName
  address: string
  budget?: number
  income?: number
  admin?: Types.ObjectId | IAdmin
}

export type UserModel = {
  isUserExists(
    phoneNumber: string,
  ): Promise<
    Pick<IUser, 'phoneNumber' | 'password' | 'needsPasswordChange' | 'role'>
  >
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>
