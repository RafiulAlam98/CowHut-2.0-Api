import { Model, Types } from 'mongoose'
import { IUser } from '../users/user.interface'

export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej'
export type ILocations =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'
export type ILabel = 'for sale' | 'sold out'
export type ICategory = 'Dairy' | 'Beef' | 'Dual Purpose'

export type ICow = {
  name: string
  age: string
  price: number
  location: ILocations
  breed: IBreed
  weight: string
  label?: ILabel
  category: ICategory
  seller: Types.ObjectId | IUser
}

export type ICowFilters = { searchTerm?: string }

export type CowModel = Model<ICow>
