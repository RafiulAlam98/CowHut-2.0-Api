import { Model } from 'mongoose'
import { UserName } from '../../../interface/username'

export type IAdmin = {
  name: UserName
  role: 'admin'
  phoneNumber: string
  address: string
}

export type AdminModel = Model<IAdmin>
