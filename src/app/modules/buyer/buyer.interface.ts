import { Model } from 'mongoose'
import { UserName } from '../../../interface/username'

export type IBuyer = {
  _id?: string
  id: string
  phoneNumber: string
  role: 'buyer'
  password: string
  name: UserName
  address: string
  budget: number
}

export type BuyerModel = Model<IBuyer>
