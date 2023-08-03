import { Model } from 'mongoose'
import { UserName } from '../../../interface/username'

export type ISeller = {
  sellerId: string
  name: UserName

  address: string
  income: number
}

export type SellerModel = Model<ISeller>
