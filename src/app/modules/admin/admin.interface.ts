import { Model } from 'mongoose'
import { UserName } from '../../../interface/username'

export type IAdmin = {
  adminId: string
  name: UserName
  phoneNumber: string
  address: string
}

export type AdminModel = Model<IAdmin>
