import { Model } from 'mongoose'
import { UserName } from '../../../interface/username'

export type IBuyer = {
  buyerId: string
  name: UserName
  phoneNumber: string
  address: string
  budget: number
}

export type BuyerModel = Model<IBuyer>
